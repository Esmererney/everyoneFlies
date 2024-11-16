import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("vuelos")
@Unique(["cod_vuelo"])
export class Vuelo {
  
  @PrimaryGeneratedColumn()
    id_vuelo! : number

  @Column({ type: "varchar", length: 10, nullable: false })
  cod_vuelo!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  aerolinea!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  origen_aeropuerto!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  destino_aeropuerto!: string;

  @Column({ type: "timestamp", nullable: true })
  fecha_salida!: Date;

  @Column({ type: "timestamp", nullable: true })
  fecha_llegada!: Date;

  @Column({ type: "int", nullable: true })
  duracion!: number;

  @Column({ type: "int", nullable: true })
    total_asientos!: number;

  @Column({ type: "int", nullable: true })
    asientos_disponibles!: number;

  @Column({ type: "varchar", length: 50, nullable: true })
    estado_vuelo!: string;
}
