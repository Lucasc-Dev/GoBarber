import { inject, injectable } from 'tsyringe';

import IUsersRepositories from '../repositories/IUsersRepository';
import IUserTokensRepositories from '../repositories/IUserTokensRepository';

import AppError from '@shared/errors/AppError';

interface Request {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepositories,
        
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepositories,
    ) {}

    public async execute({ token, password }: Request): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }
        
        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User token does not exists');
        }

        user.password = password;

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
