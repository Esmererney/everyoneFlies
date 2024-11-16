import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios") 
export class Usuario  {

  @PrimaryGeneratedColumn()
    id_vuelo : number = 0

  @PrimaryColumn()
    correo?: string; 

  @Column()
    contraseña?: string; 

  @Column()
    rol?: string; 
}
