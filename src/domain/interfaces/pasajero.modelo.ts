import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pasajeros') // Nombre de la tabla en la base de datos
export class Pasajero {
  
  @PrimaryGeneratedColumn()
    id_pasajero!: number;

  @Column()
    nombre!: string;

  @Column()
    apellido!: string;

  @Column()
    email!: string;

  @Column()
    telefono!: string;

  @Column()
    nacionalidad!: string;

  @Column()
    id_pasaporte!: string;  // Si 'id_pasaporte' es numérico, puedes cambiarlo a tipo `number`
}
