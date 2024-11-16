import { validate, IsString, IsInt, IsEmail, IsDate, Min,Max } from "class-validator";

export class PasajeroDto {
    @IsString()
    nombre: string;
    
    @IsString()
    apellido: string;

    @IsEmail()
    email: string;

    @IsInt()
    @Min(0)
    @Max(10)
    telefono: number;

    @IsString()
    nacionalidad: string;

    @IsInt()
    id_pasaporte: number;


    constructor(body: {
        nombre: string;
        apellido: string;
        email: string;
        telefono: number;
        nacionalidad: string; 
        id_pasaporte: number;
    }) {
        this.nombre = body?.nombre;
        this.apellido = body?.apellido;
        this.email = body?.email;
        this.telefono = body?.telefono;
        this.nacionalidad = body?.nacionalidad;
        this.id_pasaporte = body?.id_pasaporte;
    }

    async validateDto() {
        // NOTA: Retorna un arrays de errores.
        // Si no hay errores, retorna un array vacio.
        return await validate(this, {
          validationError: { target: false, value: false },
        });
      }
}