import { Exclude } from 'class-transformer';
import { Todos } from 'src/todos/todos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly username: string;

  @Column({unique: true})
  readonly email: string;

  @Column()
  @Exclude()
  readonly password: string;

  @OneToMany(() => Todos, (todos) => todos.user)
  todos: Todos[]
}