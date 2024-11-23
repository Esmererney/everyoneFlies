import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { VueloEntity } from "./vuelos.entity";


@Entity("reserva")
export class ReservaEntity {
  
  @PrimaryGeneratedColumn({ name: "id_reserva" })
  id_reserva!: number;

  @Column({ name: "cod_vuelo", type: "varchar"})
  cod_vuelo!: string;

  @CreateDateColumn({ name: "fecha_reserva", type: "datetime" })
  fecha_reserva?: Date;

  @Column({ name: "estado_reserva", type: "varchar", default: "Disponible"})
  estado_reserva?: string;

  @Column({ name: "cantidad_pasajeros", type: "int" })
  cantidad_pasajeros?: number;

  @ManyToOne(() => VueloEntity, (vuelo) => vuelo.id_vuelo)
  @JoinColumn({ name: "cod_vuelo" })
  vuelo?: VueloEntity;
}

  
