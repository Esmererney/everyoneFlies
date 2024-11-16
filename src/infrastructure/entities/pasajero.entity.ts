import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm"

@Entity("pasajero")
export class PasajeroEntity {
    @PrimaryGeneratedColumn()
    id_pasajero!: number

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column()
    email: string

    @Column({ length: 10 })
    telefono: number

    @Column()
    nacionalidad: string
    
    @Column()
    id_pasaporte: number

    constructor(body: {
        nombre: string;
        apellido: string;
        email: string;
        telefono: number;
        nacionalidad: string; 
        id_pasaporte: number; 
    }) {
        this.nombre = body?.nombre;
        this.apellido = body?.apellido;
        this.email = body?.email;
        this.telefono = body?.telefono;
        this.nacionalidad = body?.nacionalidad;
        this.id_pasaporte = body?.id_pasaporte;
    }
}