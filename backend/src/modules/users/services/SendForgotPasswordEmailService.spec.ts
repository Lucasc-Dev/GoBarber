import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email.', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new SendForgotPasswordEmailService(
            fakeUsersRepository,
        );

    });
});