import { validate, IsString, IsInt, IsNumber } from "class-validator";

export class CreatePreciosTemporalesDto {
    @IsString()
    temporada: string;

    @IsInt()
    demanda: number;

    @IsInt()
    disponibilidad: number;

    @IsNumber()
    precio_final: number;

    constructor(body: {
        temporada: string;
        demanda: number;
        disponibilidad: number;
        precio_final: number;
    }) {
        this.temporada = body?.temporada;
        this.demanda = body?.demanda;
        this.disponibilidad = body?.disponibilidad;
        this.precio_final = body?.precio_final;
    }

    async validateDto() {
        // Retorna un array de errores. Si no hay errores, el array estará vacío.
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
