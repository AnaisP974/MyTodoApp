import { Injectable } from '@nestjs/common';
import { AddTodosDto } from './dtos/addTodosDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './todos.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todos) private readonly userRepository: Repository<Todos> ) {}
    
    async postAddTodos(body: AddTodosDto, user: User) {
        const todo = this.userRepository.create(body)
        todo.user = user
        await this.userRepository.save(todo)
        return "Created article"
    }
}
