import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { pasajeroReservaEntity } from "./pasajero_reserva.entity";


@Entity("reserva")
export class ReservaEntity {
  
  @PrimaryGeneratedColumn({ name: "id_reserva" })
  id_reserva!: number;

  @Column({ name: "cod_vuelo", type: "varchar", length: 10 })
  cod_vuelo!: string;

  @CreateDateColumn({ name: "fecha_reserva", type: "datetime" })
  fecha_reserva?: Date;

  @Column({ name: "estado_reserva", type: "varchar", length: 100 })
  estado_reserva?: string;

  @Column({ name: "cantidad_pasajeros", type: "int" })
  cantidad_pasajeros?: number;

  // @OneToOne(() => Vuelo, (vuelo) => vuelo.reserva)
  // @JoinColumn({ name: "cod_vuelo" })
  // vuelo: Vuelo;

  @OneToMany(() => pasajeroReservaEntity, (pasajeroReserva: pasajeroReservaEntity) => pasajeroReserva.reserva)
  pasajerosReserva?: pasajeroReservaEntity[];
}

  
