// Importando o <TextInput> para extender as props do componente
import { TextInput } from 'react-native';

import styled from 'styled-components/native';

export const InputContainer = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;

  padding: 16px;

  border-radius: 6px;

  color: ${({ theme }) => theme.COLORS.WHITE};
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;
