import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import { AddTodosDto } from './dtos/addTodosDto';
import { TodosService } from './todos.service';
import { User } from 'src/user/user.entity';


@Controller('todos')
export class TodosController {
    constructor(private readonly todosService : TodosService ) {}

    @Get("/all")
    @Render("todos/all")
    getTodos() {}

    @Get('/add')
    @Render("todos/addTodos")
    getAddTodos(){}

    @Post("/add")
    async postAddTodos(@Body() body: AddTodosDto, @Session() session: Record<string, any>) {
        const currentUser: User = session.user;
        return await this.todosService.postAddTodos(body, currentUser)
    }
}
