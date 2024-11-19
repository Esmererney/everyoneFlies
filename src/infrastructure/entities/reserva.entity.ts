import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("reserva")
export class ReservaEntity {
  
  @PrimaryGeneratedColumn()
  id_reserva!: number ; 

  @Column()
  cod_vuelo!: string;

  @Column()
  fecha_reserva: string;

  @Column()
  estado_reserva: string;

  @Column()
  cantidad_pasajeros: number;

  constructor(body:{
    id_reserva:number
    cod_vuelo:string
    fecha_reserva: string
    estado_reserva:string
    cantidad_pasajeros:number
  }) {
    this.id_reserva = body?.id_reserva;
    this.cod_vuelo= body?.cod_vuelo
    this.fecha_reserva =body?.fecha_reserva
    this.estado_reserva = body?.estado_reserva
    this.cantidad_pasajeros = body?.cantidad_pasajeros
  }

  

}
