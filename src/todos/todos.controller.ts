import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Redirect, Render, Res, Session, UseInterceptors } from '@nestjs/common';
import { AddTodosDto } from './dtos/addTodosDto';
import { TodosService } from './todos.service';
import { User } from 'src/user/user.entity';
import { Response, response } from 'express';


@Controller('todos')
export class TodosController {
    constructor(private readonly todosService : TodosService ) {}

    @Get("/all")
    @Render("todos/all")
    async getTodos() {
        const todos = await this.todosService.getAllTodos()
        return {todos}
    }

    @Get('/add')
    @Render("todos/addTodos")
    getAddTodos(){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post("/add")
    @Redirect("/todos/all")
    async postAddTodos(@Body() body: AddTodosDto, @Session() session: Record<string, any>) {
        const currentUser: User = session.user;
        return await this.todosService.postAddTodos(body, currentUser)
    }

    @Get("/detail/:id")
    @Render("todos/detail")
    async getDetailTodos(@Param("id") id: string, @Res() response : Response) {
        try {
            const todos = await this.todosService.getDetailTodos(id)
            return {todos}
        } catch (error) {
           response.status(404).render("errors/404", {message : error.message})
        }
    }
}
