import { TextInputProps } from 'react-native';

import { InputContainer } from './styles';

// type Props = TextInputProps &{
//   label: string;
// }

export function Input({...rest}: TextInputProps) {
  return (
    <InputContainer {...rest} />
  )
}