import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity("usuarios") 
export class Usuario  {
  @PrimaryColumn({ type: "varchar", length: 255 })
  correo!: string; 

  @Column({ type: "varchar", length: 255, nullable: false })
  contraseña!: string; 

  @Column({ type: "varchar", length: 50, nullable: false })
  rol!: string; 
}
