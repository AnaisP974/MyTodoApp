import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly projectName: string;

  @Column()
  readonly step1: string;
  @Column({nullable: true})
  readonly step2: string;
  @Column({nullable: true})
  readonly step3: string;
  @Column({nullable: true})
  readonly step4: string;
  @Column({nullable: true})
  readonly step5: string;

  @Column({nullable: true})
  readonly todo1: string;
  @Column({nullable: true})
  readonly todo2: string;
  @Column({nullable: true})
  readonly todo3: string;
  @Column({nullable: true})
  readonly todo4: string;
  @Column({nullable: true})
  readonly todo5: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User
}