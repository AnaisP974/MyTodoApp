import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { User } from './user.entity';
import { LoginDto } from './dtos/loginDto';

@Injectable()
export class UserService {
   
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
      
    async postSignup(body: SignupDto): Promise<string> {
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
    
    async postLogin(body: LoginDto) {
        // Récupérer le mot de passe et l'email
        const {password, email} = body
        // Vérifier si utilisateur existant
        const user = await this.usersRepository.findOne({where : {email : email}})
        // si utilisateur inéxistant
        if(!user) throw new NotFoundException("User not found.")
        console.log(user)
        //vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw new UnauthorizedException("Invalid Password.")
        return user
    }
}
