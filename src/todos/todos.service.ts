import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodosDto } from './dtos/addTodosDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './todos.entity';
import { User } from 'src/user/user.entity';
import { todoDto } from './dtos/todoDto';
import { TodoListDto } from './dtos/todoListDto';

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
    async postDetailTodo(body: todoDto, currentUser: User, id: string) {
        const todo = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        const {todo1Done, todo2Done, todo3Done, todo4Done, todo5Done} = body;
   
        if(todo1Done){
            todo.todo1Done = true
        } else {
            todo.todo1Done = false
        }
        if(todo2Done){
            todo.todo2Done = true
        } else {
            todo.todo2Done = false
        }
        if(todo3Done){
            todo.todo3Done = true
        } else {
            todo.todo3Done = false
        }
        if(todo4Done){
            todo.todo4Done = true
        } else {
            todo.todo4Done = false
        }
        if(todo5Done){
            todo.todo5Done = true
        } else {
            todo.todo5Done = false
        }
        // si inexistant
        if(!todo) throw new NotFoundException("Article inexistant")
        // enregistrer le todo modifié
        todo.user = currentUser
        await this.todosRepository.save(todo)
    }

    async postUpdateTodos(body: TodoListDto, currentUser: User, id: string) {
        // Récupérer le todo
        const todo = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        const newTodo = body;

        if(newTodo.projectName){
            todo.projectName = newTodo.projectName
        }
        if(newTodo.step1){
            todo.step1 = newTodo.step1
        }
        if(newTodo.step2){
            todo.step2 = newTodo.step2
        }
        if(newTodo.step3){
            todo.step3 = newTodo.step3
        }
        if(newTodo.step4){
            todo.step4 = newTodo.step4
        }
        if(newTodo.step5){
            todo.step5 = newTodo.step5
        }
        if(newTodo.todo1){
            todo.todo1 = newTodo.todo1
        }
        if(newTodo.todo2){
            todo.todo2 = newTodo.todo2
        }
        if(newTodo.todo3){
            todo.todo3 = newTodo.todo3
        }
        if(newTodo.todo4){
            todo.todo4 = newTodo.todo4
        }
        if(newTodo.todo5){
            todo.todo5 = newTodo.todo5
        }
        // si inexistant
        if(!todo) throw new NotFoundException("Article inexistant")
        // enregistrer le todo modifié
        todo.user = currentUser
        await this.todosRepository.save(todo)
        
    }

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

    async inProgress(currentUser: User, id: string) {
        const todo = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        
        todo.status = "inProgress"
        // si inexistant
        if(!todo) throw new NotFoundException("Article inexistant")
        // enregistrer le todo modifié
        todo.user = currentUser
        await this.todosRepository.save(todo)
    }

    async complete(currentUser: User, id: string) {
        const todo = await this.todosRepository.findOne({where : {id : +id}, relations : {user : true}})
        
        todo.status = "complete"
        // si inexistant
        if(!todo) throw new NotFoundException("Article inexistant")
        // enregistrer le todo modifié
        todo.user = currentUser
        await this.todosRepository.save(todo)
    }
    
}
