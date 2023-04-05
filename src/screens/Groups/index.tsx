import { useState } from 'react';

import { FlatList } from 'react-native';

import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState([]);

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

      <Button title='Criar nova turma' type='PRIMARY' />
    </Container>
  );
}
