import { inject, injectable } from 'tsyringe';

import IUsersRepositories from '../repositories/IUsersRepository';
import IUserTokensRepositories from '../repositories/IUserTokensRepository';
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

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepositories,
    ) {}

    public async execute({ email }: Request): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        await this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido.');
    }
}

export default SendForgotPasswordEmailService;
