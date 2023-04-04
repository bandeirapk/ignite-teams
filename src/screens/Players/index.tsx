import { useState } from 'react';

import { FlatList } from 'react-native';

import { Container, Form } from './styles';

import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';

export function Players() {
  const [team, setTeam] = useState('Time A');

  return (
    <Container>
      <Header showBackButton />
  
      <Highlight 
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 

          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon 
          icon='add'
        />

      </Form>

      <FlatList 
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Filter 
            title={item}
            isActive={item === team}
          />
        )}
        horizontal
      />

    </Container>
  );
}