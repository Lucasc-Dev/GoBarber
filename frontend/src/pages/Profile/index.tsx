import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from 'react-icons/fi';
import { Container, Content, AvatarInput } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const { user } = useAuth();

    const handleSubmit = useCallback(async (data: ProfileFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            addToast({ 
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber!',
            });

            history.push('/');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error', 
                title: 'Erro no cadastro', 
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
            });
        }   
    }, [ addToast, history ]);

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form 
                    ref={formRef} 
                    initialData={{
                        name: user.name,
                        email: user.email,
                    }} 
                    onSubmit={handleSubmit}
                >  
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        <button type="button">
                            <FiCamera />
                        </button>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input 
                        containerStyle={{ marginTop: 24 }}
                        name="old_password" 
                        icon={FiLock}
                        type="password" 
                        placeholder="Senha atual" 
                    />
                    <Input 
                        name="password" 
                        icon={FiLock}
                        type="password" 
                        placeholder="Nova senha" 
                    />
                    <Input 
                        name="password_confirmation" 
                        icon={FiLock}
                        type="password" 
                        placeholder="Confirmar Senha" 
                    />

                    <Button type="submit">Confirmar mundaças</Button>
                </Form>
            </Content>
        </Container>
    )
};

export default Profile;