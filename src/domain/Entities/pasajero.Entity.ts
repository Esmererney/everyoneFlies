import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pasajeros') // Nombre de la tabla en la base de datos
export class PasajeroEntity {
  
  @PrimaryGeneratedColumn()
    id_pasajero :  number = 0

  @Column()
    nombre?: string;

  @Column()
    apellido?: string;

  @Column()
    email?: string;

  @Column()
    telefono?: string;

  @Column()
    nacionalidad?: string;

  @Column()
    id_pasaporte?: number; 
}
