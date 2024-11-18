import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vuelo } from "./vuelos.modelo";
import { Categoria } from "./categorias.modelo";
import { PreciosTemporales } from "./precios_temporales.modelo";


@Entity("asientos")
export class Asiento {

  @PrimaryGeneratedColumn()
  id_asiento?: number;

  // Clave foránea que conecta cada asiento con un vuelo específico usando id_vuelo
  @Column()
  cod_vuelo?: string; 

  // Relación ManyToOne con Vuelo
  @ManyToOne(() => Vuelo, (vuelo) => vuelo.asientos)
  @JoinColumn({ name: "cod_vuelo", referencedColumnName: "cod_vuelo" }) // Usamos cod_vuelo como clave foránea
  vuelo?: Vuelo;

  // Indica si el asiento está disponible
  @Column({ type: "boolean", default: true })
  disponible?: boolean;

  // Número de asiento
  @Column()
  numero_asiento?: string;

  // Clave foránea que conecta con la tabla PrecioTemporal
  @Column()
  id_precio_temporal?: number;

  // // Clave foránea que conecta con la tabla Categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.asientos)
  @JoinColumn({ name: "id_categoria" }) // Relación con la columna id_categoria de Categoria
  categoria?: Categoria; //revisar

}
