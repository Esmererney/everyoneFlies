import { VueloEntity } from "../domain/Entities/vuelos.Entity";
import { vueloRep } from "../Infrastructure/repository/vuelo.Repositori";

export class VueloController {

  private repository: vueloRep ;

  constructor() {
    this.repository = new vueloRep();
  }

  async agregar( vuelo : VueloEntity ) { 
    const result  =  await this.repository.crear(vuelo);
    if (result  != null) {
        return { ok: true, Resultado: result };
      } else {
        return { ok: false, messaje : "Error en envio " };
      }   
  }
    
  
  async obtener() {
    const result = await this.repository.obtenerTodos();
    return result ;
  }


  async actualizar(vuelo : VueloEntity) {
    const result  =  await this.repository.actualizar(vuelo);
    if (result  != null) {
      return { ok: true, id: result };
    } else {
      return { ok: false, id: result };
    }
  }

  async obtenerPorId(id: number) {
    try {
      const result = await this.repository.obtenerPorId(id);
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
    const result = await this.repository.eliminar(id);
    return  result
  }
  
  }






 



