import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from "../infra/typeorm/entities/User";

import AppError from '@shared/errors/AppError';
import IUsersRepositories from '../repositories/IUsersRepository';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepositories) {}

    public async execute({name, email, password}: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        
        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name, email, password: hashedPassword
        });

        return user;
    }
}

export default CreateUserService;
