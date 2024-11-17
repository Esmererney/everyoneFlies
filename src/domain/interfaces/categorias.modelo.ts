import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asiento } from "./asientos.modelo";

@Entity("categorias")
export class Categoria {

  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre_categoria: string;

  @Column("decimal")
  precio_base: number;

  @OneToMany(() => Asiento, (asiento) => asiento.categoria)
  asientos: Asiento = {} as Asiento; // revisar
  

  constructor(body: {
    id_categoria: number,
    nombre_categoria: string,
    precio_base: number
  }) {
    this.id_categoria = body.id_categoria;
    this.nombre_categoria = body.nombre_categoria;
    this.precio_base = body.precio_base;
  }
}
