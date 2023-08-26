import { ConflictException, Injectable } from '@nestjs/common';
import { signupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
      
    async postSignup(body: signupDto): Promise<string> {
        try {
            const {password} = body
            const hash = await bcrypt.hash(password, 10)
            const user = this.usersRepository.create({...body, password: hash})
            await this.usersRepository.save(user)
            return "User created !"
        } catch (error) {
            throw new ConflictException(error.message)
        }
    }
}
