import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
    it('', async () => {
        const apiResponse = {
            user: {
                id: '123',
                name: 'test',
                email: 'test@example.com.br',
            },
            token: 'token-123',
        }
        apiMock.onPost('sessions').reply(200, {
            apiResponse,
        });

        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        result.current.signIn({
            email: 'test@example.com.br',
            password: '123123',
        });

        await waitForNextUpdate();

        expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', apiResponse.token);
        expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:user', apiResponse.user);
        expect(result.current.user.email).toEqual('test@example.com.br');
    });
});