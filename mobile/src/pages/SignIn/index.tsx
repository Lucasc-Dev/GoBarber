import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { 
    Container, 
    Title, 
    ForgotPassword, 
    ForgotPasswordText, 
    CreateAccountButton, 
    CreateAccountButtonText 
} from './styles';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const handleSignIn = useCallback((data: object) => {
        console.log(data);
    }, []);

    return (
        <>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input name="email" icon="mail" placeholder="E-mail" />

                            <Input name="password" icon="lock" placeholder="Senha" />
                        </Form>

                            <Button 
                                onPress={() => { 
                                    formRef.current?.submitForm();
                                }}
                            >
                                Entrar
                            </Button>

                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>

                <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                </CreateAccountButton>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignIn;