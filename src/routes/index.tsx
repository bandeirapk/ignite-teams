import { NavigationContainer } from '@react-navigation/native'; // Crio um componente de navegação que vai ser o responsável por gerenciar as rotas

import { AppRoutes } from './app.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
