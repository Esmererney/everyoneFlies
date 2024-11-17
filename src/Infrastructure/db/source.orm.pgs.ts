
import config  from "config"
import { DataSource } from "typeorm";
import { Vuelo } from "../../domain/interfaces/vuelos.modelo";
import { Pasajero } from "../../domain/interfaces/pasajero.modelo";
import { Asiento } from "../../domain/interfaces/asientos.modelo";
import { Usuario } from "../../domain/interfaces/usuarios.modelo";
import { PreciosTemporales } from "../../domain/interfaces/precios_temporales.modelo";
import { Categoria } from "../../domain/interfaces/categorias.modelo";


const dbSSL = config.get<boolean>("SSL");

export const AppDataSourcePgs = new DataSource({
  type: "postgres",
  host: config.get<string>("HOST"),
  port: config.get<number>("DB_PORT"),
  username: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  ssl: dbSSL ? { rejectUnauthorized: false } : false,
  entities: [Vuelo, Pasajero, Asiento, Usuario, PreciosTemporales, Categoria],
  synchronize: true,
});
