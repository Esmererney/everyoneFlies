import { ReservaEntity } from "../infrastructure/entities/reserva.entity";
import { ReservaRepository } from "../infrastructure/repository/reserva.repository";

export class ReservaController {

  private repository: ReservaRepository ;

  constructor() {
    this.repository = new ReservaRepository();
  }

  async agregar( reserva : ReservaEntity ) { 
    const result  =  await this.repository.agregar(reserva);
    if (result  != null) {
        return { ok: true, id: result.id_reserva };
      } else {
        return { ok: false, messaje : "Error en envio // el codigo de reserva no se guardo corectamente" };
      }   
  }
    
  
  async obtener() {
    const result = await this.repository.obtener();
    return result ;
  }


  async actualizar(reserva : ReservaEntity) {
    const result  =  await this.repository.actualizar(reserva);
    if (result  != null) {
      return { ok: true, id: result };
    } else {
      return { ok: false, id: result };
    }
  }

  async obtenerById(id: number) {
    try {
      const result = await this.repository.obtenerById(id);
      if (result) {
        return result
      } else {
        return "El ID de la reserva no se encuentra en la base de datos";
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultar el codigo de reserva.");
      return error;
    }
  }

  async eliminar(id: number) {
    const result = await this.repository.eliminar(id);
    return  result
  }
  
  }






 



