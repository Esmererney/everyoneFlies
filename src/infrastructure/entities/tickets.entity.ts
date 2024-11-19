import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, OneToOne, JoinColumn,  CreateDateColumn } from "typeorm";
import { ReservaEntity} from "./reserva.entity";
import { PasajeroEntity} from "./pasajero.entity";

@Entity("tickets")
export class TicketsEntity {
  
  @PrimaryGeneratedColumn()
  id_ticket!: number ; 

  @Column({ name: "estado_ticket", type: "enum", enum: ["emitido", "check-in", "abordado", "finalizado", "cancelado"] })
  estado_ticket?: string;

  @CreateDateColumn({ name: "fecha_emision", type: "datetime" })
  fecha_emision?: Date;

  @OneToOne(() => ReservaEntity, (reserva) => reserva.id_reserva)
  @JoinColumn({ name: "id_reserva" })
  reserva?: ReservaEntity;

  // @OneToOne(() => Vuelo, (vuelo) => vuelo.cod_vuelo)
  // @JoinColumn({ name: "cod_vuelo" })
  // vuelo: Vuelo;

  @OneToOne(() => PasajeroEntity, (pasajero) => pasajero.id_pasajero,)
  @JoinColumn({ name: "id_pasajero" })
  pasajero?: PasajeroEntity;
}
