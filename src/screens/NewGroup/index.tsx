import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';

import { AppError } from '@utils/AppError';

import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { Container, Content, Icon } from './styles';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleGroupAdd() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'O nome da turma não pode ser vazio');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message);
      } else {
        Alert.alert('Novo grupo', 'Ocorreu um erro inesperado');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title='Nova Turma'
          subtitle='crie uma nova turma para adicionar pessoas'
        />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleGroupAdd}
        />
      </Content>
    </Container>
  );
}
