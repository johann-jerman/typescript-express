import {
    BaseEntity, Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { UserInterface } from "../../interfaces/User.interfaces";

@Entity()
export class Users extends BaseEntity implements UserInterface {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
    
    @Column()
    lastname!: string;

    @Column()
    @IsNotEmpty()
    @Unique(['email'])
    email!: string;

    @Column()
    @IsNotEmpty()
    password!: string;
  
    @Column()
    @CreateDateColumn()
    created_at!: Date;
  
    @Column()
    @UpdateDateColumn()
    updated_at!: Date;
    
    @Column()
    @DeleteDateColumn()
    deleted_at!: Date;
}