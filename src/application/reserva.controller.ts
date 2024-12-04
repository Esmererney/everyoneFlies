import { ReservaEntity } from "../infrastructure/entities/reserva.entity";
import { pasajeroReservaEntity } from "../infrastructure/entities/pasajero_reserva.entity";
import { ReservaRepository } from "../infrastructure/repositories/reserva.repository";
import { VueloRepository } from "../infrastructure/repositories/vuelo.repository";
import { PasajeroRepository } from "../infrastructure/repositories/pasajero.repository";
import { PasajeroEntity } from "../infrastructure/entities/pasajero.entity";
import { PasajeroReservaRepository } from "../infrastructure/repositories/pasajero_reserva.repository";
import { AsientoRepository } from "../infrastructure/repositories/asiento.repository";
import { CategoriaRepository } from "../infrastructure/repositories/categoria.repository";
// import { AppDataSource } from "../infrastructure/repositories/config/data-source-orm";
import { AppDataSourceMysql } from "../infrastructure/db/source.orm";
import { SeleccionarCategoriaController } from "./seleccionar_categoria-controller";


export class ReservaController {

  private repository: ReservaRepository ;
  private vueloRepository: VueloRepository;
  private pasajeroRepository: PasajeroRepository;
  private asientoRepository: AsientoRepository;
  private categoriaRepository: CategoriaRepository;
  private pasajeroReservaRepository: PasajeroReservaRepository;
  private seleccionarCategoriaController: SeleccionarCategoriaController;

  constructor() {
    this.repository = new ReservaRepository();
    this.vueloRepository = new VueloRepository();
    this.pasajeroRepository = new PasajeroRepository();
    this.asientoRepository = new AsientoRepository();
    this.categoriaRepository = new CategoriaRepository();
    this.pasajeroReservaRepository = new PasajeroReservaRepository();
    this.seleccionarCategoriaController = new SeleccionarCategoriaController();
  }

  // Crear una nueva reserva
  async crearReserva(data: { 
    id_vuelo: string; 
    ids_asientos: number[]; 
    datos_pasajeros: Array<{ nombre: string; apellido: string, email: string, telefono: string, nacionalidad: string, id_pasaporte: string }>
  }) {
    const reservaRepository = AppDataSourceMysql.getRepository(ReservaEntity);
    const pasajeroRepository = AppDataSourceMysql.getRepository(PasajeroEntity);

    // Verificar si el vuelo existe
    const id_vuelo = data.id_vuelo;
    let n_id_vuelo = Number(id_vuelo)

    const vuelo = await this.vueloRepository.obtenerPorId(Number(id_vuelo));
    console.log('vuelo', vuelo);
    
    if (!vuelo) {
      return "Vuelo no encontrado";
    }

    // Verificar disponibilidad de asientos
    const ids_asientos = data.ids_asientos;
    if (ids_asientos.length === 0) {
      return "Debe seleccionar al menos un asiento";
    }

    const asientosSeleccionados = await this.asientoRepository.obtenerAsientosPorIds(ids_asientos);
    console.log('asientosSeleccionados', asientosSeleccionados);
    
    if (asientosSeleccionados.length !== ids_asientos.length) {
      return "Uno o más asientos seleccionados no existen";
    }


    // Validar que los asientos estén disponibles y pertenezcan al vuelo
    for (const asiento of asientosSeleccionados) {

      console.log(!asiento.disponible || asiento.id_vuelo !== n_id_vuelo)
      console.log("----" +  asiento.disponible)
      console.log("----" +  asiento.id_vuelo)
      console.log("----" +  n_id_vuelo)




      if (!asiento.disponible || asiento.id_vuelo !== n_id_vuelo) {

        return `El asiento ${asiento.id_asiento} no está disponible para este vuelo`;
      }
    }

    // Verificar que los datos de pasajeros coincidan con los asientos seleccionados
    if (data.datos_pasajeros.length !== ids_asientos.length) {
      return "La cantidad de pasajeros no coincide con los asientos seleccionados";
    }

    // Insertar los pasajeros en la tabla pasajero y obtener sus IDs
    const pasajerosInsertados = [];
    for (const pasajeroData of data.datos_pasajeros) {
      const pasajero = pasajeroRepository.create(pasajeroData); // Crear un objeto pasajero con los datos recibidos
      await this.pasajeroRepository.agregar(pasajero); // Guardar el pasajero en la base de datos
      pasajerosInsertados.push(pasajero); // Guardar el pasajero insertado para asociarlo con la reserva
    }

    console.log("Pasajeros insertados", pasajerosInsertados);

    // Calcular precio total considerando categorías de asientos
    let precio_total = 0;
    for (const asiento of asientosSeleccionados) {
      let categoria = await this.categoriaRepository.obtenerCategoriaPorId(Number(asiento.id_categoria))

      const precioAsiento = await this.seleccionarCategoriaController.seleccionarCategoriaYCalcularPrecio({
        id_vuelo: n_id_vuelo,
        categoria: String(categoria?.nombre_categoria),
      });
      precio_total += precioAsiento.precio;
    }

    // Crear la reserva
    const reserva = reservaRepository.create({
      id_vuelo,
      cantidad_pasajeros: ids_asientos.length,
      precio_total,
      fecha_reserva: new Date(),
    });

    const nuevaReserva = await this.repository.agregar(reserva);

    console.log("---------nueva reserva-----------", nuevaReserva);

    // Asociar asientos y pasajeros a la reserva
    for (let i = 0; i < ids_asientos.length; i++) {
      
      const pasajero = data.datos_pasajeros[i];
      const asiento = asientosSeleccionados[i];
      const pasajero_insertado = pasajerosInsertados[i];
      
      let categoria = await this.categoriaRepository.obtenerCategoriaPorId(Number(asiento.id_categoria))
      const pasajeroReserva = new pasajeroReservaEntity();
      pasajeroReserva.id_reserva = nuevaReserva.id_reserva;
      pasajeroReserva.id_pasajero = pasajero_insertado.id_pasajero;
      pasajeroReserva.id_asiento = asiento.id_asiento;

      // Obtener el precio del asiento según su categoría
      const precioAsiento = await this.seleccionarCategoriaController.seleccionarCategoriaYCalcularPrecio({
        id_vuelo: n_id_vuelo,
        categoria: String(categoria?.nombre_categoria),
      });

      pasajeroReserva.precio_subtotal = Number(precioAsiento.precio);

      await this.pasajeroReservaRepository.agregar(pasajeroReserva);

      console.log("--------pasajeroReserva---------", pasajeroReserva);

      // Marcar el asiento como ocupado
      asiento.disponible = false;
      const asiento_ocupado = await this.asientoRepository.actualizarAsiento(asiento);
      console.log('------asiento-------', asiento_ocupado);
    }

    // Actualizar asientos disponibles en el vuelo
    vuelo.asientos_disponibles -= ids_asientos.length;
    const vuelo_asiento = await this.vueloRepository.actualizar(vuelo);
    console.log('------asiento-------', vuelo_asiento);
    return { ok: true, id: nuevaReserva.id_reserva };
  }

  //Metodo para cancelar reserva
  async cancelarReserva(id_reserva: number) {
    // Verificar si la reserva existe
    const reservaExistente = await this.repository.reservaExistente(id_reserva);
  
    if (!reservaExistente) {
      return "Reserva no encontrada";
    }
  
    // Obtener el vuelo asociado a la reserva
    const vuelo = reservaExistente.vuelo;
    if (!vuelo) {
      return "Vuelo no encontrado";
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
  
  async actualizarReserva(id_reserva: number, data: { 
    ids_asientos?: number[], 
    datos_pasajeros?: Array<{ nombre: string; apellido: string; email: string; telefono: string; nacionalidad: string; id_pasaporte: string }>
  }) {
    // Verificar si la reserva existe
    const reservaExistente = await this.repository.reservaExistente(id_reserva);
    console.log('Reserva', reservaExistente);
    
    if (!reservaExistente) {
      return "Reserva no encontrada";
    }
  
    // Obtener información del vuelo asociado
    const id_vuelo = Number(reservaExistente?.id_vuelo)
    const vuelo = await this.vueloRepository.obtenerPorId(id_vuelo);
    console.log("vuelo", vuelo);
    
    if (!vuelo) {
      return "Vuelo asociado a la reserva no encontrado";
    }
  
    // Actualizar asientos, si se proporciona
    if (data.ids_asientos) {
      const nuevosAsientos = await this.asientoRepository.obtenerAsientosPorIds(data.ids_asientos);
  
      if (nuevosAsientos.length !== data.ids_asientos.length) {
        return "Uno o más asientos seleccionados no existen";
      }
  
      for (const asiento of nuevosAsientos) {
        if (!asiento.disponible || asiento.id_vuelo !== vuelo.id_vuelo) {
          return `El asiento ${asiento.id_asiento} no está disponible o no pertenece al vuelo seleccionado`;
        }
      }
  
      // Liberar los asientos actuales
      for (const pasajeroReserva of reservaExistente.pasajeroReservas) {
        const asientoActual = await this.asientoRepository.obtenerAsientoPorId(Number(pasajeroReserva.id_asiento));
        if (asientoActual) {
          asientoActual.disponible = true;
          await this.asientoRepository.actualizarAsiento(asientoActual);
        }
      }
  
      // Asociar los nuevos asientos
      for (let i = 0; i < data.ids_asientos.length; i++) {
        const nuevoAsiento = nuevosAsientos[i];
        nuevoAsiento.disponible = false;
        await this.asientoRepository.actualizarAsiento(nuevoAsiento);
  
        const pasajeroReserva = reservaExistente.pasajeroReservas[i];
        pasajeroReserva.id_asiento = nuevoAsiento.id_asiento;
        await this.pasajeroReservaRepository.actualizar(pasajeroReserva);
      }
  
      // Actualizar disponibilidad de asientos del vuelo
      vuelo.asientos_disponibles += reservaExistente.pasajeroReservas.length - data.ids_asientos.length;
      await this.vueloRepository.actualizar(vuelo);
    }
  
    // Actualizar datos de los pasajeros, si se proporcionan
    if (data.datos_pasajeros) {
      if (data.datos_pasajeros.length !== reservaExistente.pasajeroReservas.length) {
        return "La cantidad de pasajeros no coincide con la cantidad de asientos seleccionados";
      }
  
      for (let i = 0; i < data.datos_pasajeros.length; i++) {
        const datosPasajero = data.datos_pasajeros[i];
        const pasajeroReserva = reservaExistente.pasajeroReservas[i];
        const pasajero = await this.pasajeroRepository.obtenerPorId(Number(pasajeroReserva.id_pasajero));
  
        if (pasajero) {
          pasajero.nombre = datosPasajero.nombre;
          pasajero.apellido = datosPasajero.apellido;
          pasajero.email = datosPasajero.email;
          pasajero.telefono = datosPasajero.telefono;
          pasajero.nacionalidad = datosPasajero.nacionalidad;
          pasajero.id_pasaporte = datosPasajero.id_pasaporte;
          await this.pasajeroRepository.actualizar(pasajero);
        }
      }
    }
  
    // Retornar confirmación
    return { ok: true, mensaje: "Reserva actualizada exitosamente" };
  }
    
    
}