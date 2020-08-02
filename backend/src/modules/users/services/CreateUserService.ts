import { inject, injectable } from 'tsyringe';

import User from "../infra/typeorm/entities/User";

import AppError from '@shared/errors/AppError';
import IUsersRepositories from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepositories,

        @inject('HashProvider')
        private HashProvider: IHashProvider,
    ) {}

    public async execute({name, email, password}: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        
        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.HashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name, email, password: hashedPassword
        });

        return user;
    }
}

export default CreateUserService;
