import config from "config"
import { DataSource } from "typeorm"
// import { VueloEntity } from "../../entities/vuelo.entity"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

const common: any = {
    host: config.get('HOST'),
    // port: config.get<number>('PORT'),
    username: config.get('USER'),
    password: config.get('PASSWORD') || '',
    database: config.get('DATABASE'),
    // synchronize: true, // NOTA: Si esta 
    // entities: [VueloEntity], // NOTA: Registrar cada entidad "tabla"
}
const postgresConfig: PostgresConnectionOptions = {
    type: "postgres",
    ssl: true,
    ...common
}
const mysqlConfig: MysqlConnectionOptions = {
    type: "mysql",
    ...common
}
export const AppDataSource = new DataSource(
    config.get('DB_TYPE') === 'mysql' ? mysqlConfig : postgresConfig, // Tipo de base de datos
)

async function verifyConnection() {
    try {
        // Intentar inicializar la conexión
        await AppDataSource.initialize()
        console.log("Conexión a la base de datos MySQL exitosa")
    } catch (error) {
        // Si ocurre un error, mostrarlo
        console.error("Error de conexión a la base de datos:", error)
    }
}

// Llamar a la función para verificar la conexión
verifyConnection()