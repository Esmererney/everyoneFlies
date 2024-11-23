import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import { VueloEntity } from "./vuelos.entity";


@Entity("reserva")
export class ReservaEntity {
  
  @PrimaryGeneratedColumn({ name: "id_reserva" })
  id_reserva!: number;

  @Column()
  cod_vuelo?: string;

  @CreateDateColumn({ name: "fecha_reserva", type: "datetime" })
  fecha_reserva?: Date;

  @Column({ name: "estado_reserva", type: "varchar", length: 100 })
  estado_reserva?: string;

  @Column({ name: "cantidad_pasajeros", type: "int" })
  cantidad_pasajeros?: number;

  @Column({ name: "precio_total", type: "int" })
  precio_total?: number;

  @ManyToOne(() => VueloEntity, (vuelo) => vuelo.cod_vuelo , { nullable: false })
  vuelo?: VueloEntity;
  
}

  
