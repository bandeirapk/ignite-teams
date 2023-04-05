import { useNavigation } from '@react-navigation/native';

import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const navigation = useNavigation();

  function handleGroupAdd() {
    navigation.navigate('players', { group: 'Nova Turma' });
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

        <Input placeholder='Nome da turma' />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleGroupAdd}
        />
      </Content>
    </Container>
  );
}
