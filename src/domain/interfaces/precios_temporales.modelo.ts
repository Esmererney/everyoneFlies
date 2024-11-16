import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("precios_temporales")
export class PreciosTemporales  {

  @PrimaryGeneratedColumn()
  id: number = 0

  @Column()
  temporada?: string;

  @Column()
  demanda?: number;

  @Column()
  disponibilidad?: number;

  @Column()
  precio_final?: number;
}
