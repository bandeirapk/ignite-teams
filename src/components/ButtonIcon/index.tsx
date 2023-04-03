import { TouchableOpacityProps } from 'react-native';

import { ButtonIconContainer, Icon } from './styles';

type Props = TouchableOpacityProps & {


}

export function ButtonIcon({}: Props) {
  return (
    <ButtonIconContainer>
      <Icon name="home" type='PRIMARY'/>
    </ButtonIconContainer>
  );
}