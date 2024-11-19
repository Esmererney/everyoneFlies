import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn  } from "typeorm";
import { PasajeroEntity } from "./pasajero.entity";

@Entity("pasajero_reserva")
export class pasajeroReservaEntity {

    @PrimaryGeneratedColumn()
    id_pasajero_reserva!: number

    @Column()
    id_reserva: number


    @Column()
    id_asiento: number

    @ManyToOne(() => PasajeroEntity, (pasajero) => pasajero.id_pasajero)
    @JoinColumn({name: "id_pasajero"})
    pasajero: PasajeroEntity = {} as PasajeroEntity;

    constructor(body: {
        id_reserva: number;
        id_asiento: number;
    },) {
        this.id_reserva = body?.id_reserva;
        this.id_asiento = body?.id_asiento;
    }
}