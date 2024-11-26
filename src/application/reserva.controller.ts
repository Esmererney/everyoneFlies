import { ReservaEntity } from "../infrastructure/entities/reserva.entity";
import { pasajeroReservaEntity } from "../infrastructure/entities/pasajero_reserva.entity";
import { ReservaRepository } from "../infrastructure/repositories/reserva.repository";
import { vueloRepository } from "../infrastructure/repositories/vuelo.repository";
import { PasajeroRepository } from "../infrastructure/repositories/pasajero.repository";
import { PasajeroReservaRepository } from "../infrastructure/repositories/pasajero_reserva.repository";
import { AsientoRepository } from "../infrastructure/repositories/asiento.repository";
import { CategoriaRepository } from "../infrastructure/repositories/categoria.repository";
// import { AppDataSource } from "../infrastructure/repositories/config/data-source-orm";
import { AppDataSourceMysql } from "../infrastructure/db/source.orm";
import { AsientoEntity } from "../infrastructure/entities/asientos.entity";
import { VueloEntity } from "../infrastructure/entities/vuelos.entity";


export class ReservaController {

  private repository: ReservaRepository ;
  private vueloRepository: vueloRepository;
  private pasajeroRepository: PasajeroRepository;
  private asientoRepository: AsientoRepository;
  private categoriaRepository: CategoriaRepository;
  private pasajeroReservaRepository: PasajeroReservaRepository;

  constructor() {
    this.repository = new ReservaRepository();
    this.vueloRepository = new vueloRepository();
    this.pasajeroRepository = new PasajeroRepository();
    this.asientoRepository = new AsientoRepository();
    this.categoriaRepository = new CategoriaRepository();
    this.pasajeroReservaRepository = new PasajeroReservaRepository();
  }

  // Crear una nueva reserva
  async crearReserva(data : {id_pasajero: number, id_vuelo: string, cantidad_pasajeros: number, categoria: string, precio_subtotal: number, precio_total: number }) {
    const reservaRepository = AppDataSourceMysql.getRepository(ReservaEntity);

    // Verificar si el vuelo existe
    const id_vuelo = data.id_vuelo
    const vuelo = await this.vueloRepository.obtenerPorId(Number(id_vuelo));
    if (!vuelo) {
      throw new Error("Vuelo no encontrado");
    }

    //Verifica la cantidad de asientos disponbiles
    if (vuelo.asientos_disponibles < data.cantidad_pasajeros) {
      throw new Error("Cantidad de asientos no disponible");
    }

    // Verificar que el pasajero exista
    const id_pasajero = Number(data.id_pasajero)
    const passenger = await this.pasajeroRepository.obtenerPorId(id_pasajero);
    if (!passenger) {
      throw new Error("Pasajero no encontrado");
    }

    //Obtener ID de categoria
    const categoria_asiento = await this.categoriaRepository.obtenerCategoriaPorNombre(data.categoria)
    if (categoria_asiento == null) {
      throw new Error("Esta Categoria no existe");
    }
    const id_categoria = Number(categoria_asiento?.id_categoria)
    
    // Consultar los asientos disponibles para el vuelo y la categoría
    const detallesAsientos = await this.asientoRepository.obtenerDetallesAsientosDisponibles(
      vuelo.id_vuelo,
      id_categoria,
      data.cantidad_pasajeros
    );

    //Verificar disponibilidad segun la categoria
    if (detallesAsientos.length < data.cantidad_pasajeros) {
      throw new Error("No hay suficientes asientos disponibles para esta Categoria");
    }

    // Crear la reserva
    const reserva = reservaRepository.create({
      ...data,
      fecha_reserva: new Date(),
    });

    // Reducir la cantidad de asientos disponibles
    vuelo.asientos_disponibles -= data.cantidad_pasajeros;
    const vueloActualizado = await this.vueloRepository.actualizar(vuelo);

    // Guardar la reserva en la base de datos
    const nuevaReserva = await this.repository.agregar(reserva);

    // Crear relaciones de pasajero con asientos (una por cada asiento requerido)
    for (const asiento of detallesAsientos) {
      const pasajeroReserva = new pasajeroReservaEntity();
      pasajeroReserva.id_asiento = asiento.id_asiento;
      pasajeroReserva.id_reserva = nuevaReserva.id_reserva;
      pasajeroReserva.id_pasajero = id_pasajero;
      pasajeroReserva.precio_subtotal = data.precio_subtotal;
      const pasajeroReserva2 = await this.pasajeroReservaRepository.agregar(pasajeroReserva);
    }

    // Actualizar el estado del asiento a ocupado
    for (let i = 0; i < data.cantidad_pasajeros; i++) {
      const asiento = detallesAsientos[i];
      asiento.disponible = false;
      await this.asientoRepository.actualizarAsiento(asiento);
    }

    if (nuevaReserva  != null) {
      return { ok: true, id: nuevaReserva.id_reserva };
    } else {
      return { ok: false, messaje : "Error al guardar la reserva" };
    }
  }

  async actualizarReserva(data: {id_reserva: number, id_pasajero: number, cantidad_pasajeros: number, categoria: string, precio_subtotal: number, precio_total: number}) {
    // Verificar si la reserva existe
    const reservaExistente = await this.repository.reservaExistente(data.id_reserva);

    if (!reservaExistente || reservaExistente == null) {
      throw new Error("Reserva no encontrada");
    }
  
    // Verificar si el vuelo existe
    const vuelo = reservaExistente.vuelo;
    if (!vuelo) {
      throw new Error("Vuelo no encontrado");
    }
  
    // Verificar si la cantidad de asientos es mayor o menor
    const diferenciaAsientos = data.cantidad_pasajeros - reservaExistente.pasajeroReservas.length;
  
    // Verificar si hay suficiente disponibilidad de asientos en el vuelo
    if (diferenciaAsientos > 0 && vuelo.asientos_disponibles < diferenciaAsientos) {
      throw new Error("No hay suficientes asientos disponibles");
    }
  
    // Obtener el ID de categoría del asiento
    const categoria_asiento = await this.categoriaRepository.obtenerCategoriaPorNombre(data.categoria);
    if (!categoria_asiento) {
      throw new Error("Categoría no encontrada");
    }

    //Id categoria escogida
    const id_categoria = categoria_asiento.id_categoria;
  
    // Consultar los asientos disponibles para la categoría y cantidad
    const detallesAsientosDisponibles = await this.asientoRepository.obtenerDetallesAsientosDisponibles(
      vuelo.id_vuelo,
      id_categoria,
      Math.abs(diferenciaAsientos)
    );
  
    if (detallesAsientosDisponibles.length < Math.abs(diferenciaAsientos)) {
      throw new Error("No hay suficientes asientos disponibles para esta categoría");
    }

    // Actualizar el vuelo según la diferencia de asientos
    if (diferenciaAsientos > 0) {
      // Reducir la cantidad de asientos disponibles en el vuelo
      vuelo.asientos_disponibles -= diferenciaAsientos;
      await this.vueloRepository.actualizar(vuelo);

      // Crear relaciones de pasajero con nuevos asientos
      for (let i = 0; i < diferenciaAsientos; i++) {
        const asiento = detallesAsientosDisponibles[i];
        const pasajeroReserva = new pasajeroReservaEntity();
        pasajeroReserva.id_asiento = asiento.id_asiento;
        pasajeroReserva.id_reserva = reservaExistente.id_reserva;
        pasajeroReserva.id_pasajero = data.id_pasajero;
        pasajeroReserva.precio_subtotal = data.precio_subtotal;
  
        await this.pasajeroReservaRepository.agregar(pasajeroReserva);

        // Actualizar el estado del asiento a ocupado
        asiento.disponible = false;
        await this.asientoRepository.actualizarAsiento(asiento);

      }
    } else if (diferenciaAsientos < 0) {
      // Aumentar la cantidad de asientos disponibles en el vuelo
      vuelo.asientos_disponibles += Math.abs(diferenciaAsientos);
      await this.vueloRepository.actualizar(vuelo);
      // Eliminar las relaciones de pasajeros con los asientos
      const asientosAEliminar = reservaExistente.pasajeroReservas.slice(data.cantidad_pasajeros);

      for (const pasajeroReserva of asientosAEliminar) {
        // Actualizar el estado de los asientos a disponible
        const asiento = pasajeroReserva.asiento;
        
        if (asiento) {
          asiento.disponible = true;
          await this.asientoRepository.actualizarAsiento(asiento);
          
        }
  
        // Eliminar la relación de pasajero con el asiento
        await this.pasajeroReservaRepository.eliminar(pasajeroReserva.id_pasajero_reserva);
      }
    }
  
    // Actualizar los detalles de la reserva
    reservaExistente.precio_total = data.precio_total;
    await this.repository.agregar(reservaExistente);
  
    // Devolver la respuesta
    return { ok: true, id: reservaExistente.id_reserva };
  }

  //Metodo para cancelar reserva
  async cancelarReserva(id_reserva: number) {
    // Verificar si la reserva existe
    const reservaExistente = await this.repository.reservaExistente(id_reserva);
  
    if (!reservaExistente) {
      throw new Error("Reserva no encontrada");
    }
  
    // Obtener el vuelo asociado a la reserva
    const vuelo = reservaExistente.vuelo;
    if (!vuelo) {
      throw new Error("Vuelo no encontrado");
    }
  
    // Obtener la cantidad de pasajeros de la reserva
    const cantidadPasajeros = reservaExistente.pasajeroReservas.length;
  
    // Liberar los asientos asociados
    for (const pasajeroReserva of reservaExistente.pasajeroReservas) {
      const asiento = await this.asientoRepository.obtenerAsientoPorId(Number(pasajeroReserva.id_asiento));
      if (asiento) {
        asiento.disponible = true; // Marcar el asiento como disponible
        await this.asientoRepository.actualizarAsiento(asiento);
      }
      // Eliminar la relación en la tabla `PasajeroReserva`
      await this.pasajeroReservaRepository.eliminar(pasajeroReserva.id_pasajero_reserva);
    }
  
    // Incrementar la cantidad de asientos disponibles en el vuelo
    vuelo.asientos_disponibles += cantidadPasajeros;
    await this.vueloRepository.actualizar(vuelo);
  
    // Actualizar el estado de la reserva a "cancelado"
    reservaExistente.estado_reserva = "cancelado";
    await this.repository.agregar(reservaExistente);
  
    return { ok: true, mensaje: "Reserva cancelada exitosamente" };
  }
  
  async obtener() {
    const result = await this.repository.obtener();
    return result ;
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






 



