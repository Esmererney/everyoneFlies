import { TicketsEntity } from "../entities/tickets.entity";
import { AppDataSource } from "../repository/config/data-source-orm";
import{Repository} from "typeorm"
export class TicketsRepository {
  repository: Repository<TicketsEntity>;

  constructor() {
      this.repository = AppDataSource.getRepository(TicketsEntity)
  }

  agregar(tickets: TicketsEntity) {
      return this.repository.save(tickets)
  }

  obtener(){
      return this.repository.find()
  }
  
  obtenerById(id: number){
      return this.repository.findOne({
        select:{
          id_reserva: true,
          cod_vuelo: true,
          id_pasajero: true,
          fecha_emision:true,
          estado_ticket:true,
        },
          where: {
              id_ticket:id
          },
      })
  }

  eliminar(id_ticket: number) {
      return this.repository.delete({id_ticket})
  }

  actualizar(tickets: TicketsEntity) {
      return this.repository.update(tickets.id_ticket, {
       
        cod_vuelo: tickets.cod_vuelo,
        id_pasajero: tickets.id_pasajero,
        fecha_emision: tickets.fecha_emision,
        estado_ticket: tickets.estado_ticket,
      })
  }


  obtenerPorId(id_ticket: number){
      return this.repository.find({
          where: {
              id_reserva: id_ticket
          }
      })
  }


}