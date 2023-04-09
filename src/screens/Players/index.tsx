import { useState, useEffect, useRef } from 'react';

import { Alert, FlatList, TextInput, Keyboard } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Digite o nome da pessoa para adicionar.'
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar a pessoa.');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Nova pessoa',
        'Não foi possível buscar as pessoas do time selecionado.'
      );
    }
  }

  async function removePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
      Alert.alert('Remover pessoa', 'Pessoa removida com sucesso.');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Nova pessoa',
        'Não foi possível buscar as pessoas do time selecionado.'
      );
    }
  }

  async function handleRemovePlayer(playerName: string) {
    Alert.alert('Remover pessoa', 'Deseja remover a pessoa?', [
      { text: 'Sim', onPress: async () => removePlayer(playerName) },
      { text: 'Não', style: 'cancel' },
    ]);
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover turma', 'Não foi possível remover a turma.');
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover turma', 'Deseja remover o grupo e todas as pessoas?', [
      { text: 'Sim', onPress: async () => removeGroup() },
      { text: 'Não', style: 'cancel' },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle='adicione a galera e separe os times'
      />
      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={(value) => setNewPlayerName(value)}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={() => handleAddPlayer()}
          returnKeyType='done'
        />

        <ButtonIcon
          icon='add'
          onPress={() => handleAddPlayer()}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message='Não há pessoas nesse time.' />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title='Remover Turma'
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
