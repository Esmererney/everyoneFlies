import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn  } from "typeorm";
import { PasajeroEntity } from "./pasajero.entity";
import { ReservaEntity } from "./reserva.entity";
// import { AsientoEntity } from "./asiento.entity";

@Entity("pasajero_reserva")
export class pasajeroReservaEntity {

    @PrimaryGeneratedColumn()
    id_pasajero_reserva!: number

    @Column()
    id_asiento: number
    
    @ManyToOne(() => ReservaEntity, (reserva) => reserva.id_reserva)
    @JoinColumn({name: "id_reserva"})
    reserva?: ReservaEntity

    @ManyToOne(() => PasajeroEntity, (pasajero) => pasajero.id_pasajero)
    @JoinColumn({name: "id_pasajero"})
    pasajero?: PasajeroEntity;
    
    // @ManyToOne(() => AsientoEntity, (asinto) => asinto.id_pasajero)
    // @JoinColumn({name: "id_asiento"})
    // asinto?: AsientoEntity;

    constructor(body: {
        id_asiento: number;
    },) {
        this.id_asiento = body?.id_asiento;
    }
}