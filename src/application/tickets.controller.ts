import { TicketsEntity } from "../infrastructure/entities/tickets.entity";
import { TicketsRepository } from "../infrastructure/repository/tickets.respository";

export class TicketsController {

  private repository: TicketsRepository ;

  constructor() {
    this.repository = new TicketsRepository();
  }

  async agregar( tickets : TicketsEntity ) { 
    const result  =  await this.repository.agregar(tickets);
    if (result  != null) {
        return { ok: true, id: result.id_ticket };
      } else {
        return { ok: false, messaje : "Error al guardar la reserva  " };
      }   
  }
    
  
  async obtener() {
    const result = await this.repository.obtener();
    return result ;
  }


  async actualizar(tickets : TicketsEntity) {
    const result  =  await this.repository.actualizar(tickets);
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
        return "El Id del ticket no se encuentra";
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultar el id de la reserva.");
      return error;
    }
  }

  async eliminar(id: number) {
    const result = await this.repository.eliminar(id);
    return  result
  }
  
  }