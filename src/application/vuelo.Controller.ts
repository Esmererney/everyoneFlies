import { VueloEntity } from "../infrastructure/entities/vuelos.entity";
import { vueloRepository } from "../infrastructure/repositories/vuelo.repository";
import { CategoriaRepository } from "../infrastructure/repositories/categoria.repository";
import { AsientoRepository } from "../infrastructure/repositories/asiento.repository";
import { AsientoEntity } from "../infrastructure/entities/asientos.entity";


export class VueloController {

  private repository: vueloRepository ;

  constructor() {
    this.repository = new vueloRepository();
  }

  // async agregar( vuelo : VueloEntity ) { 
  //   const result  =  await this.repository.crear(vuelo);

  //   if (result  != null) {
  //       return { ok: true, Resultado: result };
  //     } else {
  //       return { ok: false, messaje : "Error en envio " };
  //     }   
      
  // }

  async agregar(vuelo: VueloEntity) {
    
    const result = await this.repository.crear(vuelo);
    
    if (!result || !vuelo.total_asientos) {
      return { ok: false, message: "Error al crear el vuelo o no se especificó el total de asientos" };
    } 

    const vueloCreado = await this.repository.obtenerPorCodVuelo(vuelo.cod_vuelo);
  
    try {
      // Obtener IDs de las categorías
      const categoriaRepo = new CategoriaRepository();
      const primera_clase = await categoriaRepo.obtenerCategoriaPorNombre("primera_clase");
      const business = await categoriaRepo.obtenerCategoriaPorNombre("business");
      const economica_premium = await categoriaRepo.obtenerCategoriaPorNombre("economica_premium");
      const economica = await categoriaRepo.obtenerCategoriaPorNombre("economica");
  
      // Validar que las categorías existen
      if (!primera_clase || !business || !economica_premium || !economica) {
        return { ok: false, message: "Error: Una o más categorías no están configuradas en la base de datos" };
      }
  
      // Calcular distribución de asientos
      const totalAsientos = vuelo.total_asientos;
      const asientosPrimeraClase = Math.floor((totalAsientos * 0.12) / 4) * 4;
      const asientosBusiness = Math.floor((totalAsientos * 0.12) / 4) * 4;
      const asientosEconomicaPremium = Math.round(totalAsientos * 0.36);
      const asientosEconomica = totalAsientos - (asientosPrimeraClase + asientosBusiness + asientosEconomicaPremium);

      
      const asientoRepo = new AsientoRepository();
      let numeroAsiento = 1;
      
      // Crear asientos para cada categoría
      const crearAsientos = async (cantidad: number, idCategoria: number) => {
        for (let i = 0; i < cantidad; i++) {
          const asiento: AsientoEntity = {
            id_asiento: 0,
            id_vuelo: vueloCreado?.id_vuelo,
            disponible: true,
            numero_asiento: `A${numeroAsiento++}`,
            id_categoria: idCategoria,
          };
          await asientoRepo.agregarAsiento(asiento);
        }
      };
  
      await crearAsientos(asientosPrimeraClase, primera_clase.id_categoria);
      await crearAsientos(asientosBusiness, business.id_categoria);
      await crearAsientos(asientosEconomicaPremium, economica_premium.id_categoria);
      await crearAsientos(asientosEconomica, economica.id_categoria);
  
      return { ok: true, Resultado: result };
    } catch (error) {
      console.error("Error al crear los asientos: ", error);
      return { ok: false, message: "Error al crear los asientos para el vuelo" };
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