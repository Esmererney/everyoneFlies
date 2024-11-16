import { Vuelo } from "../../domain/interfaces/vuelos.modelo";
import { AppDataSourcePgs } from "../db/source.orm.pgs";

export class vueloRepositori {

  private vueloRepo = AppDataSourcePgs.getRepository(Vuelo);

  
  async obtenerVuelo() {
    return this.vueloRepo.find(); // obtener todos los datos
  }

  async  obtenerVueloPorId(idVuelo : number) {
    const vuelo = await this.vueloRepo.findOneBy( { id_vuelo : idVuelo } );
    return vuelo != null ?  vuelo : null; 
  }

  async agregarVuelo(datos: Vuelo) {
    const vuelo = this.vueloRepo.create(datos);
    const vueloExistente = await this.vueloRepo.findOneBy({ cod_vuelo : datos.cod_vuelo });
    if (vueloExistente) {
      return null;  // Retorna null si el código ya está en uso
    }else{
      return this.vueloRepo.save(vuelo);
    }

  }

  async actualizarVuelo(datos: Vuelo) { 

    const result = await this.vueloRepo.update( datos.id_vuelo  , { 
        cod_vuelo: datos.cod_vuelo,
        aerolinea: datos.aerolinea,
        origen_aeropuerto: datos.origen_aeropuerto,
        destino_aeropuerto: datos.destino_aeropuerto,
        fecha_salida: datos.fecha_salida,
        fecha_llegada: datos.fecha_llegada,
        duracion: datos.duracion,
        total_asientos: datos.total_asientos,
        asientos_disponibles: datos.asientos_disponibles,
        estado_vuelo: datos.estado_vuelo,
      });

    if (result.affected && result.affected > 0) {
      return result;
    } else {
      return false;
    }
  }

  async eliminarVuelo(idVuelo: number) {

    const vuelo = await this.vueloRepo.findOneBy({ id_vuelo : idVuelo });
    if (vuelo) {
      await this.vueloRepo.remove(vuelo);
      return vuelo;
    } else {
      console.log('Cliente no encontrado');
      return null;
    }
     
  }

}
