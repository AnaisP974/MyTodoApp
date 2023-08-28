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
        host: 'containers-us-west-99.railway.app',
        port: 6409,
        username: 'root',
        password: 'DyhQZI1kydyTBIJgGJ6I',
        database: 'railway',
        entities: [User, Todos],
        synchronize: false,
    }),
    UserModule,
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
