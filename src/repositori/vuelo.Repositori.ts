import { Pool } from "pg";
import { getPoolConnectionPgs } from "../../db/source.psg";
import { vueloModelo } from "../interfaces/modelo";


export class vueloRepositori {

  async obtenerVuelo() {
    const connection = getPoolConnectionPgs();
    const querySql = `SELECT * FROM vuelos`;
    const result = await connection.query(querySql);
    return result;
  }

  async agregarVuelo(vueloModelo: vueloModelo) {
    
    const connection: Pool = getPoolConnectionPgs();
  
    const query = `INSERT INTO vuelos (
        cod_vuelo, 
        aerolinea, 
        origen_aeropuerto, 
        destino_aeropuerto, 
        fecha_salida, 
        hora_salida, 
        fecha_llegada, 
        hora_llegada, 
        duracion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_vuelo`;
  
      const values = [
        vueloModelo.cod_vuelo,
        vueloModelo.aerolinea,
        vueloModelo.origen_aeropuerto,
        vueloModelo.destino_aeropuerto,
        vueloModelo.fecha_salida,
        vueloModelo.hora_salida,
        vueloModelo.fecha_llegada,
        vueloModelo.hora_llegada,
        vueloModelo.duracion
      ];
  
      try {
        const result = await connection.query(query, values);
        console.log('Vuelo insertado, ID:', result.rows[0].id_vuelo);
        return result
      } catch (err) {
        console.error('Error al insertar vuelo:', err);
      }

  }

  // async obtenerUsarioUno(idVuelo: number): Promise<RowDataPacket[]> {

  // }

  async modificarVuelo() {}

  // async eliminarVuelo(idVuelo: number): Promise<ResultSetHeader> {
  //    ;
  // }
}
