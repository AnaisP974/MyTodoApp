import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodosDto } from './dtos/addTodosDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './todos.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todos) private readonly todosRepository: Repository<Todos>) {}
    
    async postAddTodos(body: AddTodosDto, user: User) {
        const todo = this.todosRepository.create(body)
        todo.user = user
        await this.todosRepository.save(todo)
        return "Created article"
    }
    
    async getAllTodos() {
        const todos = await this.todosRepository.find({order : {created_at : "DESC"}})
        return todos
    }
    
    async getDetailTodos(id: string) {
        const todos = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        if(!todos) throw new NotFoundException("Article inexistant")
        return todos
    }
}
