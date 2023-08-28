import { IsDate } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { isDate } from 'util/types';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  projectName: string;

  @Column()
  step1: string;
  @Column({nullable: true})
  step2: string;
  @Column({nullable: true})
  step3: string;
  @Column({nullable: true})
  step4: string;
  @Column({nullable: true})
  step5: string;

  @Column({nullable: true})
  todo1: string;
  @Column({nullable: true})
  todo2: string;
  @Column({nullable: true})
  todo3: string;
  @Column({nullable: true})
  todo4: string;
  @Column({nullable: true})
  todo5: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User
}