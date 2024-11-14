import { vueloModelo } from "../interfaces/modelo";
import { vueloRepositori } from "../repositori/vuelo.Repositori";

export class VueloController {

  private repository: vueloRepositori ;

  constructor() {
    this.repository = new vueloRepositori();
  }

  async agregar( vueloModelo : vueloModelo ) {
   
    const result  =  await this.repository.agregarVuelo(vueloModelo);

    if (result  != null) {
        return { ok: true, id: result };
      } else {
        return { ok: false, id: result };
      }
      
  }
    
  
  async obtener() {
    const result = await this.repository.obtenerVuelo();
    console.log("Esto son los vuelos : ");
    return result.rows ;
  }


  async actualizar(payload: { }) {
    
  }

  async obtenerPorId(id: number) {
   
  }

  async eliminar(id: number) {
    
  }

}




 



