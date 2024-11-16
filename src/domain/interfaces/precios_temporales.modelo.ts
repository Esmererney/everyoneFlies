import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("precios_temporales")
export class PreciosTemporales  {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  temporada!: string;

  @Column({ type: "integer", nullable: false })
  demanda!: number;

  @Column({ type: "integer", nullable: false })
  disponibilidad!: number;

  @Column({ type: "float", nullable: false })
  precio_final!: number;
}
