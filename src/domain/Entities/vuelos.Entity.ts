import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany  } from "typeorm";

@Entity("vuelos")
@Unique(["cod_vuelo"])
export class VueloEntity {
  
  @PrimaryGeneratedColumn()
  id_vuelo : number = 0 ;

  @Column()
  cod_vuelo?: string;

  @Column()
  aerolinea?: string;

  @Column()
  origen_aeropuerto?: string;

  @Column()
  destino_aeropuerto?: string;

  @Column()
  fecha_salida?: Date;

  @Column()
  fecha_llegada?: Date;

  @Column()
    duracion?: number;

  @Column()
    total_asientos?: number;

  @Column()
    asientos_disponibles?: number;

  @Column()
    estado_vuelo?: string;

  // @OneToMany(() => Asiento, (asiento) => asiento.asientos)
  // asientos: AsientoEntity = {} as Asiento;
  
}
