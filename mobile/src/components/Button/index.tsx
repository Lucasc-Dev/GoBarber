import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
    children: string;
}

const Input: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            <ButtonText>{children}</ButtonText>
        </Container>
    );
};

export default Input;