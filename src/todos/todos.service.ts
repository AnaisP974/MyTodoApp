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
    
    async getAllTodos(currentUser: User) {
        const todos = await this.todosRepository.find({where : {user: currentUser}, order : {created_at : "DESC"}, relations : {user : true}})
        return todos
    }
    
    async getTodo(id: string) {
        const todos = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        if(!todos) throw new NotFoundException("Article inexistant")
        return todos
    }

    async postUpdateTodos(body: AddTodosDto, currentUser: User, id: string) {
        // Récupérer le todo
        let todo = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        // si inexistant
        if(!todo) throw new NotFoundException("Article inexistant")
        // enregistrer le todo modifié
        todo = await this.todosRepository.save(body)
        return "Updated todo"
    }

    // async deleteTodo(currentUser: User, id: string) {
    //     // Récupérer le todo
    //     let todo = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
    //     // si inexistant
    //     if(!todo) throw new NotFoundException("Article inexistant")
    //     // supprimer le todo sélectionné
    //     await this.todosRepository.delete(id)
    //     return "Deleted todo"
    // }
    async deleteTodo(currentUser: User, id: string): Promise<boolean> {
        const todo = await this.todosRepository.findOne({ where: { id: +id, user: currentUser } });
    
        if (!todo) {
            throw new NotFoundException("Todo not found");
        }
    
        try {
            await this.todosRepository.delete(todo.id);
            return true; // Suppression réussie
        } catch (error) {
            console.error("Error deleting todo:", error);
            return false; // Échec de la suppression
        }
    }
}
