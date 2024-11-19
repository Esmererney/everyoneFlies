
import config  from "config"
import { DataSource } from "typeorm"
import { VueloEntity } from "../../domain/Entities/vuelos.Entity"
import { PasajeroEntity } from "../../domain/Entities/pasajero.Entity"
import { AsientoEntity } from "../../domain/Entities/asientos.Entity"
import { UsuarioEntity } from "../../domain/Entities/usuarios.Entity"
import { PreciosTemporalesEntity } from "../../domain/Entities/precios_temporales.Entity"

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




