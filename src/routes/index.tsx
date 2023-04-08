import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'; // Crio um componente de navegação que vai ser o responsável por gerenciar as rotas

import { AppRoutes } from './app.routes';

import { useTheme } from 'styled-components/native';

export function Routes() {
  const { COLORS } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}
    >
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
