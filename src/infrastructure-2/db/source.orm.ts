
import config  from "config"
import { DataSource } from "typeorm"
import { VueloEntity } from "../entities/vuelos.entity"
import { PasajeroEntity } from "../entities/pasajero.entity"
import { AsientoEntity } from "../entities/asientos.entity"
import { UsuarioEntity } from "../entities/usuarios.entity"
import { PreciosTemporalesEntity } from "../entities/precios_temporales.entity"

export const AppDataSourceMysql = new DataSource({
    type: "mysql", // Tipo de base de datos
    host: config.get('HOST'),
    port: config.get('DB_PORT'),
    username: config.get('USER'),
    password: config.get('PASSWORD'),
    database: config.get('DATABASE'),
    entities: [VueloEntity , PasajeroEntity , AsientoEntity ,UsuarioEntity , PreciosTemporalesEntity],  // NOTA: Registrar cada entidad "tabla"
    synchronize: true,
})




