import { inject, injectable } from 'tsyringe';

import IUsersRepositories from '../repositories/IUsersRepository';

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepositories,
    ) {}

    public async execute(): Promise<void> {}
}

export default SendForgotPasswordEmailService;
