import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Vuelo } from "./vuelos.modelo";
import { PreciosTemporales } from "./precios_temporales.modelo";

@Entity("asientos")
@Unique(["cod_vuelo"])
export class Asiento {
  @PrimaryGeneratedColumn()
  id_asientos!: number;

  @ManyToOne(() => Vuelo)
  @JoinColumn({ name: "cod_vuelo" }) // Establece la relación con la clave foránea `cod_vuelo`
  cod_vuelo!: Vuelo;

  @Column()
  id_categoria!: number;

  @Column({ default: true })
  disponible!: boolean;

  @Column()
  numero_asiento!: string;

  @Column()
  id_precio_temporal!: string;

  @ManyToOne(() => PreciosTemporales)
  @JoinColumn({ name: "id_precio_temporal" })
  precio_temporal!: PreciosTemporales;
}
