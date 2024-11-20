import { ReservaEntity } from "../entities/reserva.entity";
import { AppDataSource } from "./config/data-source-orm";
import{Repository} from "typeorm"
export class ReservaRepository {
  repository: Repository<ReservaEntity>;

  constructor() {
      this.repository = AppDataSource.getRepository(ReservaEntity)
  }

  agregar(reserva: ReservaEntity) {
      return this.repository.save(reserva)
  }

  obtener(){
      return this.repository.find()
  }
  
  obtenerById(id: number){
      return this.repository.findOne({
        select:{
          id_reserva: true,
          cod_vuelo: true,
          fecha_reserva: true,
          estado_reserva:true,
          cantidad_pasajeros:true,
        },
          where: {
              id_reserva:id
          },
      })
  }

  eliminar(id_reserva: number) {
      return this.repository.delete({id_reserva})
  }

  actualizar(reserva: ReservaEntity) {
      return this.repository.update(reserva.id_reserva, {
       
        cod_vuelo: reserva.cod_vuelo,
        fecha_reserva: reserva.fecha_reserva,
        estado_reserva: reserva.estado_reserva,
        cantidad_pasajeros: reserva.cantidad_pasajeros
      })
  }


  obtenerPorId(id_reserva: number){
      return this.repository.find({
          where: {
              id_reserva: id_reserva
          }
      })
  }


}