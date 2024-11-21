import { Vuelo } from "./vuelo.interface";

export interface Reserva {
  id_reserva: number;
  cod_vuelo: string;
  fecha_reserva?: Date;
  estado_reserva?: string;
  cantidad_pasajeros?: number;
  vuelo?: Vuelo;
}