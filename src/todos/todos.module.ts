import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, AppService]
})
export class TodosModule {}
