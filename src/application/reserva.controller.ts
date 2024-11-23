import { ReservaEntity } from "../infrastructure/entities/reserva.entity";
import { pasajeroReservaEntity } from "../infrastructure/entities/pasajero_reserva.entity";
import { ReservaRepository } from "../infrastructure/repositories/reserva.repository";
import { vueloRepository } from "../infrastructure/repositories/vuelo.repository";
import { PasajeroRepository } from "../infrastructure/repositories/pasajero.repository";
import { PasajeroReservaRepository } from "../infrastructure/repositories/pasajero_reserva.repository";
import { AsientoRepository } from "../infrastructure/repositories/asiento.repository";
import { ReservasService }  from "../infrastructure/service/reserva.service";
import { CategoriaRepository } from "../infrastructure/repositories/categoria.repository";
import { AppDataSource } from "../infrastructure/repositories/config/data-source-orm";

const reservasService = new ReservasService();

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
  async crearReserva(data : {id_pasajero: number, cod_vuelo: string, cantidad_pasajeros: number, categoria: string }) {
    // const vueloRepository = AppDataSource.getRepository(VueloEntity);
    const reservaRepository = AppDataSource.getRepository(ReservaEntity);

    // Verificar si el vuelo existe
    const cod_vuelo = data.cod_vuelo
    const vuelo = await this.vueloRepository.obtenerPorCodVuelo(cod_vuelo);
    if (!vuelo) {
      throw new Error("Vuelo no encontrado");
    }

    //Verifica la cantidad de asientos disponbiles
    //Probarlo
    console.log(vuelo.asientos_disponibles);
    
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
      data.cod_vuelo,
      id_categoria,
      data.cantidad_pasajeros
    );
    
    // Verificar disponibilidad de asientos
    if (detallesAsientos.length < data.cantidad_pasajeros) {
      throw new Error("No hay suficientes asientos disponibles");
    }

    //Verificar disponibilidad segun la categoria
    

    // Crear la reserva
    const reserva = reservaRepository.create({
      ...data,
      // vuelo: vuelo, // Relacionar el vuelo
      fecha_reserva: new Date(),
    });

    // Reducir la cantidad de asientos disponibles

    vuelo.asientos_disponibles -= data.cantidad_pasajeros;
    
    const vueloActualizado = await this.vueloRepository.actualizar(vuelo);

    // console.log('Nueva reserva', reserva);
    
    // Guardar la reserva en la base de datos
    const nuevaReserva = await this.repository.agregar(reserva);
    
    // Crear relaciones de pasajero con asientos (una por cada asiento requerido)
    for (const asiento of detallesAsientos) {
      const pasajeroReserva = new pasajeroReservaEntity();
      pasajeroReserva.id_asiento = asiento.id_asiento;
      pasajeroReserva.id_reserva = nuevaReserva.id_reserva;
      pasajeroReserva.id_pasajero = id_pasajero;
      const pasajeroReserva2 = await this.pasajeroReservaRepository.agregar(pasajeroReserva);
      console.log('pasajero reserva', pasajeroReserva2);
    }

    

    /* if (nuevaReserva  != null) {
      return { ok: true, id: nuevaReserva.id_reserva };
    } else {
      return { ok: false, messaje : "Error en envio // el codigo de reserva no se guardo corectamente" };
    } */
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






 



