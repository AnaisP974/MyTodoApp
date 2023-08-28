import { Body, ClassSerializerInterceptor, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Redirect, Render, Res, Session, UseInterceptors } from '@nestjs/common';
import { AddTodosDto } from './dtos/addTodosDto';
import { TodosService } from './todos.service';
import { User } from 'src/user/user.entity';
import { Response, response } from 'express';


@Controller('todos')
export class TodosController {
    constructor(private readonly todosService : TodosService ) {}

    @Get("/all")
    @Render("todos/all")
    async getTodos(@Session() session: Record<string, any>) {
        const currentUser: User = session.user;
        const todos = await this.todosService.getAllTodos(currentUser)
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
    async getTodo(@Param("id") id: string, @Res() response : Response) {
        try {
            const todos = await this.todosService.getTodo(id)
            return {todos}
        } catch (error) {
           response.status(404).render("errors/404", {message : error.message})
        }
    }
    @Get("/update/:id")
    @Render("todos/update")
    async getModifyTodo(@Param("id") id: string, @Res() response : Response) {
        try {
            const todos = await this.todosService.getTodo(id)
            return {todos}
        } catch (error) {
           response.status(404).render("errors/404", {message : error.message})
        }
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Post("/update/:id")
    @Redirect("/todos/all")
    async postUpdateTodos(@Body() body: AddTodosDto, @Session() session: Record<string, any>, @Param("id") id: string,) {
        const currentUser: User = session.user;
        return await this.todosService.postUpdateTodos(body, currentUser, id)
    }
 
    @Get("/delete/:id")
    @Delete("/delete/:id")
    @Redirect("/todos/all")
    async deleteTodo(@Param("id") id: string, @Session() session: Record<string, any>) {
        const currentUser: User = session.user;
        const result = await this.todosService.deleteTodo(currentUser, id);
        if (result) {
            // Suppression réussie
            return { message: "Todo deleted successfully" };
        } else {
            // Gestion de l'échec de la suppression
            throw new InternalServerErrorException("Failed to delete todo");
        }
    }

}
