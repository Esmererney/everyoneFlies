export interface curd {

    obtenerTodos(): any ;
    obtenerPorId(id: number): any ;
    crear(datos: any): any ;
    actualizar(datos: any): any  ;
    eliminar(id: number): any;

}
  