import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { localData } from 'src/middlewares/localsData';

@Controller('todos')
export class TodosController {
    constructor(private readonly appService: AppService ) {}

    @Get("/all")
    @Render("todos/all")
    getTodos() {}
}
