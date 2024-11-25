import { AppDataSourceMysql } from "../db/source.orm";
import { ReservaEntity } from "../entities/reserva.entity";
import{Repository} from "typeorm"
export class ReservaRepository {
  repository: Repository<ReservaEntity>;

  constructor() {
      this.repository = AppDataSourceMysql.getRepository(ReservaEntity)
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
          id_vuelo: true,
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
       
        id_vuelo: reserva.id_vuelo,
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

  reservaExistente(id_reserva: number) {
    return this.repository.findOne({
        where: { id_reserva: id_reserva },
        relations: ['pasajeroReservas', 'vuelo'], // Esto asegura que cargue la relación
      });
  }

  
  

}