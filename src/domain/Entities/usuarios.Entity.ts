import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Usuario") 
export class UsuarioEntity  {

  @PrimaryGeneratedColumn()
    id_user : number = 0

  @PrimaryColumn()
    email?: string; 

  @Column()
    password?: string; 

  @Column()
    role?: string; 
}
