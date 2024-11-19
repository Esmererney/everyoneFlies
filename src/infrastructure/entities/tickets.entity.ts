import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("tickets")
export class TicketsEntity {
  
  @PrimaryGeneratedColumn()
  id_ticket!: number ; 

  @Column()
  id_reserva!: number;

  @Column()
  cod_vuelo: string;

  @Column()
  id_pasajero: number;

  @Column()
  fecha_emision: number;
  
  @Column()
  estado_ticket: string

  constructor(body:{
    id_ticket: number
    id_reserva:number
    cod_vuelo:string
    id_pasajero:number
    fecha_emision: number
    estado_ticket: string
    
   
  }) {
    this.id_ticket = body?.id_ticket
    this.id_reserva = body?.id_reserva;
    this.cod_vuelo= body?.cod_vuelo
    this.id_pasajero = body?.id_pasajero
    this.fecha_emision = body?.fecha_emision
    this.estado_ticket = body?.estado_ticket
  }

  

}