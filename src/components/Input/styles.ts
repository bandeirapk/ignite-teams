// Importando o <TextInput> para extender as props do componente
import { TextInput } from 'react-native';

import styled, { css } from 'styled-components/native';

export const InputContainer = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;

  padding: 16px;

  border-radius: 6px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;

    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.GRAY_700};
  `}
`;
