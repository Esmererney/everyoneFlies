import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CategoriaEntity } from "./categorias.Entity";
import { VueloEntity } from "./vuelos.Entity";
import { PreciosTemporalesEntity } from "./precios_temporales.Entity";

@Entity("asientos")
export class AsientoEntity {

  @PrimaryGeneratedColumn()
  id_asiento: number = 0 ; 

  // Clave foránea que conecta cada asiento con un vuelo específico usando id_vuelo
  @Column()
  cod_vuelo?: string; 

  // Relación ManyToOne con Vuelo
  @ManyToOne(() => VueloEntity, (vuelo) => vuelo.cod_vuelo)
  @JoinColumn({ name: "cod_vuelo", referencedColumnName: "cod_vuelo" }) // Usamos cod_vuelo como clave foránea
  vuelo?: VueloEntity ;

  // Indica si el asiento está disponible
  @Column({ type: "boolean", default: true })
  disponible?: boolean;

  // Número de asiento
  @Column()
  numero_asiento?: string;

  // Clave foránea que conecta con la tabla PrecioTemporal
  @Column()
  id_precio_temporal?: number;

  @ManyToOne(() => PreciosTemporalesEntity)
  @JoinColumn({ name: "id_precio_temporal" })
  precio_temporal?: PreciosTemporalesEntity;
  
  // // Clave foránea que conecta con la tabla Categoria
  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.asientos)
  @JoinColumn({ name: "id_categoria" }) // Relación con la columna id_categoria de Categoria
  categoria?: CategoriaEntity  ; //revisar

  id_categoria?: number;

}
