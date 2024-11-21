
import config  from "config"
import { DataSource } from "typeorm"
import { VueloEntity } from "../entities/vuelos.entity"
import { PasajeroEntity } from "../entities/pasajero.entity"
import { AsientoEntity } from "../entities/asientos.entity"
import { UsuarioEntity } from "../entities/usuarios.entity"
import { PreciosTemporalesEntity } from "../entities/precios_temporales.entity"
import { CategoriaEntity } from "../entities/categorias.entity"
import { pasajeroReservaEntity } from "../entities/pasajero_reserva.entity"
import { ReservaEntity } from "../entities/reserva.entity"
import { TicketsEntity } from "../entities/tickets.entity"

export const AppDataSourceMysql = new DataSource({
    type: "mysql", // Tipo de base de datos
    host: config.get('HOST'),
    port: config.get('DB_PORT'),
    username: config.get('USER'),
    password: config.get('PASSWORD'),
    database: config.get('DATABASE'),
    entities: [VueloEntity ,
        PasajeroEntity ,
        AsientoEntity ,
        UsuarioEntity , 
        PreciosTemporalesEntity, 
        CategoriaEntity,
        pasajeroReservaEntity,
        ReservaEntity,
        TicketsEntity 
       ],  // NOTA: Registrar cada entidad "tabla"
    synchronize: true,
    connectTimeout: 10000, // Tiempo en milisegundos (10 segundos)


})




