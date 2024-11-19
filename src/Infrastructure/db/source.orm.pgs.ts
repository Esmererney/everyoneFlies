
import config  from "config"
import { DataSource } from "typeorm";
import { VueloEntity } from "../entities/vuelos.Entity";
import { PasajeroEntity } from "../entities/pasajero.entity";
import { AsientoEntity } from "../entities/asientos.entity";
import { UsuarioEntity } from "../entities/usuarios.entity";
import { PreciosTemporalesEntity } from "../entities/precios_temporales.entity";
import { CategoriaEntity } from "../entities/categorias.entity";

const dbSSL = config.get<boolean>("SSL");

export const AppDataSourcePgs = new DataSource({
  type: "postgres",
  host: config.get<string>("HOST"),
  port: config.get<number>("DB_PORT"),
  username: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  ssl: dbSSL ? { rejectUnauthorized: false } : false,
  entities: [VueloEntity ,
     PasajeroEntity ,
     AsientoEntity ,
     UsuarioEntity , 
     PreciosTemporalesEntity, 
     CategoriaEntity,
    ],
  synchronize: true,
});
