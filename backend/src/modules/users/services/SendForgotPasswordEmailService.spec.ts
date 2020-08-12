import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email.', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        
        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should be able to recover a non-existing user password.', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await expect(sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();
        const fakeUserTokensRepository = new FakeUserTokensRepository();

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        
        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});