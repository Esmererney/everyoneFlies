import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("precios_temporales")
export class PreciosTemporalesEntity  {

  @PrimaryGeneratedColumn()
  id_temporada: number = 0;

  @Column()
  temporada?: string;

  @Column()
  demanda?: number;

  @Column()
  disponibilidad?: number;

  @Column()
  precio_final?: number;
}
