import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AsientoEntity } from "./asientos.Entity";

@Entity("categorias")
export class CategoriaEntity {

  @PrimaryGeneratedColumn()
  id_categoria : number =  0;
  
  @Column()
  nombre_categoria?: string;

  @Column("decimal")
  precio_base?: number;


  @OneToMany(() => AsientoEntity, (asiento) => asiento.id_categoria_asiento)
  //asientos: Asiento[]; // Cambiado a un array de Asiento
  asientos?: AsientoEntity; // revisar

}

