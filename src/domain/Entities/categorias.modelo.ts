import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asiento } from "./asientos.modelo";
import { AsientoEntity } from "./asientos.Entity";

@Entity("categorias")
export class Categoria {

  @PrimaryGeneratedColumn()
  id_categoria?: number;

  @Column()
  nombre_categoria?: string;

  @Column("decimal")
  precio_base?: number;


  @OneToMany(() => Asiento, (asiento) => asiento.categoria)
  //asientos: Asiento[]; // Cambiado a un array de Asiento
  asientos?: AsientoEntity; // revisar

}

