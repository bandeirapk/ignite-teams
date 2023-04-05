import { useState } from 'react';

import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

// type RootParamList = {
//   groups: undefined;
//   new: undefined;
//   players: {
//     group: string;
//   };
// };

// type Props = {
//   navigation: NativeStackNavigationProp<
//     RootParamList,
//     'groups'
//   >;
// };

export function Groups() {
  const [groups, setGroups] = useState([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          groups.length === 0 && {
            flex: 1,
            paddingHorizontal: 78,
          }
        }
        ListEmptyComponent={() => (
          <ListEmpty
            message='Não existem turmas cadastradas. 
          Que tal cadastrar a primeira turma?'
          />
        )}
      />

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
