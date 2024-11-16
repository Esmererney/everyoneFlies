import { Vuelo } from "../domain/interfaces/vuelos.modelo";
import { vueloRepositori } from "../Infrastructure/repository/vuelo.Repositori";

export class VueloController {

  private repository: vueloRepositori ;

  constructor() {
    this.repository = new vueloRepositori();
  }

  async agregar( vuelo : Vuelo ) { 
    const result  =  await this.repository.agregarVuelo(vuelo);
    if (result  != null) {
        return { ok: true, id: result.id_vuelo };
      } else {
        return { ok: false, messaje : "Error en envio // el codigo de Vuelo esta en uso" };
      }   
  }
    
  
  async obtener() {
    const result = await this.repository.obtenerVuelo();
    return result ;
  }


  async actualizar(vuelo : Vuelo) {
    const result  =  await this.repository.actualizarVuelo(vuelo);
    if (result  != null) {
      return { ok: true, id: result };
    } else {
      return { ok: false, id: result };
    }
  }

  async obtenerPorId(id: number) {
    try {
      const result = await this.repository.obtenerVueloPorId(id);
      if (result) {
        return result
      } else {
        return "El ID del vuelo no esta : no se encuentra en la base de datos";
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  async eliminar(id: number) {
    const result = await this.repository.eliminarVuelo(id);
    return  result
  }
  
  }






 



