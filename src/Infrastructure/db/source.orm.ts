
import config  from "config"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql", // Tipo de base de datos
    host: config.get('HOST'),
    port: config.get('DB_PORT'),
    username: config.get('USER'),
    password: config.get('PASSWORD'),
    database: config.get('DATABASE'),
    entities: [ ], // NOTA: Registrar cada entidad "tabla"
    synchronize: false,
})




