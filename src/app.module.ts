import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { TodosModule } from './todos/todos.module';
import { Todos } from './todos/todos.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest_todoapp',
        entities: [User, Todos],
        synchronize: true,
    }),
    UserModule,
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
