import {Entity,PrimaryGeneratedColumn,Column,Unique,ManyToOne, JoinColumn,} from "typeorm";
import { VueloEntity } from "./vuelos.Entity";
import { PreciosTemporalesEntity } from "./precios_temporales.Entity";

@Entity("asientos")
@Unique(["cod_vuelo"])

export class AsientoEntity {

  @PrimaryGeneratedColumn()
  id_asientos : number = 0;

  @ManyToOne(() => VueloEntity)
  @JoinColumn({ name: "cod_vuelo" })
  cod_vuelo!: VueloEntity;

  @Column()
  id_categoria?: number;

  @Column({ default: true })
  disponible?: boolean;

  @Column()
  numero_asiento?: string;

  @Column()
  id_precio_temporal?: string;

  @ManyToOne(() => PreciosTemporalesEntity)
  @JoinColumn({ name: "id_precio_temporal" })
  precio_temporal?: PreciosTemporalesEntity;
  
}
