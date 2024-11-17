import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vuelo } from "./vuelos.modelo";
import { Categoria } from "./categorias.modelo";
import { PreciosTemporales } from "./precios_temporales.modelo";

@Entity("asientos")
export class Asiento {

  @PrimaryGeneratedColumn()
  id_asiento: number;

  // Clave foránea que conecta cada asiento con un vuelo específico usando id_vuelo
  @Column()
  cod_vuelo: string; 

  @ManyToOne(() => Vuelo, vuelo => vuelo.asientos)
  @JoinColumn({ name: "cod_vuelo", referencedColumnName: "cod_vuelo" })  // Usamos 'cod_vuelo' como clave foránea
  vuelo: Vuelo = {} as Vuelo;

  // // Clave foránea que conecta con la tabla Categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.asientos)
  @JoinColumn({ name: "id_categoria" }) // Relación con la columna id_categoria de Categoria
  categoria: Categoria = {} as Categoria; //revisar

  @Column()
  id_categoria: number;


  // Indica si el asiento está disponible
  @Column({ type: "boolean", default: true })
  disponible: boolean;

  // Número de asiento
  @Column()
  numero_asiento: string;

  // Clave foránea que conecta con la tabla PrecioTemporal
  @Column()
  id_precio_temporal: number;

  constructor(body: {
    id_asiento: number,
    cod_vuelo: string, 
    id_categoria: number,
    disponible: boolean,
    numero_asiento: string,
    id_precio_temporal: number
  }) {
    this.id_asiento = body.id_asiento;
    this.cod_vuelo = body.cod_vuelo;
    this.id_categoria = body.id_categoria;
    this.disponible = body.disponible;
    this.numero_asiento = body.numero_asiento;
    this.id_precio_temporal = body.id_precio_temporal;
  }
}
