import { AsientoEntity } from "../../domain/Entities/asientos.Entity";
import { AppDataSourcePgs } from "../db/source.orm.pgs";

export class AsientoRepository {

  private asientoRepo = AppDataSourcePgs.getRepository(AsientoEntity);

  // Obtener todos los asientos
  async obtenerAsientos() {
    return this.asientoRepo.find(); // Obtener todos los asientos
  }

  // Obtener un asiento por su id
  async obtenerAsientoPorId(idAsiento: number) {
    const asiento = await this.asientoRepo.findOneBy({ id_asiento: idAsiento });
    return asiento != null ? asiento : null;
  }

  // Agregar un nuevo asiento
  async agregarAsiento(datos: AsientoEntity) {
    const asiento = this.asientoRepo.create(datos);
    const asientoExistente = await this.asientoRepo.findOneBy({ cod_vuelo: datos.cod_vuelo, numero_asiento: datos.numero_asiento });
    if (asientoExistente) {
      return null; // Retorna null si el asiento ya está en uso (mismo vuelo y número de asiento)
    } else {
      return this.asientoRepo.save(asiento);
    }
  }

  // Actualizar un asiento existente
  async actualizarAsiento(datos: AsientoEntity) {
    const result = await this.asientoRepo.update(datos.id_asiento, {
      vuelo: { cod_vuelo: datos.cod_vuelo}, 
      id_categoria_asiento: datos.id_categoria_asiento,
      disponible: datos.disponible,
      numero_asiento: datos.numero_asiento,
      id_precio_temporal: datos.id_precio_temporal,
    });

    if (result.affected && result.affected > 0) {
      return result;
    } else {
      return false;
    }
  }

  // Eliminar un asiento por su id
  async eliminarAsiento(idAsiento: number) {
    const asiento = await this.asientoRepo.findOneBy({ id_asiento: idAsiento });
    if (asiento) {
      await this.asientoRepo.remove(asiento);
      return asiento;
    } else {
      console.log('Asiento no encontrado');
      return null;
    }
  }
}
