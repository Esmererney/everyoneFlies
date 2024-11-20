import { Repository } from "typeorm";
import { VueloEntity as VueloEntity } from "../../domain/Entities/vuelos.Entity";
import { curd } from "./crud.interfaz";
import { AppDataSourcePgs } from "../db/source.orm.pgs";

export class vueloRepository implements curd {
  
  private repositoryPgs: Repository<VueloEntity>;

  constructor() {
    this.repositoryPgs = AppDataSourcePgs.getRepository(VueloEntity);
  }

  obtenerTodos(){
    return this.repositoryPgs.find();
  }

  async obtenerPorId(id: number) {
    const vuelo = await this.repositoryPgs.findOneBy({ id_vuelo: id });
    return vuelo != null ? vuelo : null;
  }

  async crear(datos: VueloEntity) {
    const vuelo = this.repositoryPgs.create(datos);
    const vueloExistente = await this.repositoryPgs.findOneBy({
      cod_vuelo: datos.cod_vuelo,
    });
    if (vueloExistente) {
      return "Le vuelo ya existe"; // Retorna null si el código ya está en uso
    } else {
      return this.repositoryPgs.insert(vuelo);
      // return this.repositoryPgs.save(vuelo);
    }
  }

  async actualizar(datos: VueloEntity) {
    const result = await this.repositoryPgs.update( datos.id_vuelo  , { 
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

  async eliminar(id: number) {
    const vuelo = await this.repositoryPgs.findOneBy({ id_vuelo : id });
    if (vuelo) {
      await this.repositoryPgs.remove(vuelo);
      return vuelo;
    } else {
      console.log('Vuelo no encontrado');
      return null;
    }
  }

}
