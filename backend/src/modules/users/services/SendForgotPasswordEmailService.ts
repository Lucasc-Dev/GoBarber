import { inject, injectable } from 'tsyringe';

import IUsersRepositories from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

import AppError from '@shared/errors/AppError';

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepositories,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: Request): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (!checkUserExists) {
            throw new AppError('User does not exists.');
        }

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido.');
    }
}

export default SendForgotPasswordEmailService;
