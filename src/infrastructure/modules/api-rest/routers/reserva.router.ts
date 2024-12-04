import Express from "express";
import { ReservaController } from "../../../../application/reserva.controller"

export const RutasReserva = () => {
  
  const router = Express.Router();
  const reservaCtrl = new ReservaController();

  /**
 * @swagger
 * /reserva:
 *   post:
 *     summary: Crear una nueva reserva de vuelo
 *     description: Permite crear una nueva reserva de vuelo, asociando asientos y pasajeros.
 *     operationId: crearReserva
 *     tags:
 *       - Reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_vuelo:
 *                 type: string
 *                 description: ID del vuelo para la reserva.
 *                 example: 1
 *               ids_asientos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de los asientos seleccionados.
 *               datos_pasajeros:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       description: Nombre del pasajero.
 *                       example: Ana
 *                     apellido:
 *                        type: string
 *                        description: Apellido del pasajero
 *                        example: Rodriguez
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del pasajero.
 *                       example: ana.ro@ejemplo.com
 *                     telefono:
 *                       type: string
 *                       description: Teléfono de contacto del pasajero.
 *                       example: 3002334214
 *                     nacionalidad:
 *                       type: string
 *                       description: Nacionalidad del pasajero.
 *                       example: Colombia
 *                     id_pasaporte:
 *                       type: string
 *                       description: ID del pasaporte del pasajero.
 *                       example: 2342362457
 *     responses:
 *       201:
 *         description: Reserva creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Error de validación de datos.
 *       500:
 *         description: Error interno del servidor.
 */
  router.post("/reserva", async (req, res) => {
    try {
      const { id_vuelo, ids_asientos, datos_pasajeros } = req.body;

      // Verificar que se reciban los datos correctos
      if (!id_vuelo || !Array.isArray(ids_asientos) || ids_asientos.length === 0 || !Array.isArray(datos_pasajeros) || datos_pasajeros.some(p => 
        !p.nombre || !p.documento || !p.email || !p.telefono || !p.nacionalidad || !p.id_pasaporte)) {
        res.status(400).json({ error: "Datos incompletos. Asegúrese de enviar id_vuelo, ids_asientos y datos_pasajeros correctamente." });
      }

      // Crear la reserva utilizando el controlador
      const reservaController = new ReservaController(); // Instanciar el controlador
      const result = await reservaController.crearReserva({
        id_vuelo,
        ids_asientos,
        datos_pasajeros
      });

      res.status(201).json(result); // Respuesta exitosa con el ID de la reserva
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Ocurrió un error al crear la reserva." });
    }
  });

  // Swagger Documentation for actualizarReserva endpoint
  /**
   * @swagger
   * paths:
   *   /reserva:
   *     put:
   *       summary: Actualizar una reserva existente
   *       description: Permite actualizar los detalles de una reserva, incluyendo asientos y datos de pasajeros.
   *       tags:
   *         - Reservas
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id_reserva:
   *                   type: integer
   *                   description: ID único de la reserva que se desea actualizar.
   *                   example: 123
   *                 ids_asientos:
   *                   type: array
   *                   description: Lista de IDs de asientos que se asignarán a la reserva.
   *                   items:
   *                     type: integer
   *                   example: [1, 2, 3]
   *                 datos_pasajeros:
   *                   type: array
   *                   description: Información de los pasajeros asignados a la reserva. Debe coincidir con el número de asientos seleccionados.
   *                   items:
   *                     type: object
   *                     properties:
   *                       nombre:
   *                         type: string
   *                         description: Nombre del pasajero.
   *                         example: "Juan"
   *                       apellido:
   *                         type: string
   *                         description: Apellido del pasajero.
   *                         example: "Pérez"
   *                       email:
   *                         type: string
   *                         description: Correo electrónico del pasajero.
   *                         example: "juan.perez@example.com"
   *                       telefono:
   *                         type: string
   *                         description: Número de teléfono del pasajero.
   *                         example: "+573001234567"
   *                       nacionalidad:
   *                         type: string
   *                         description: Nacionalidad del pasajero.
   *                         example: "Colombiana"
   *                       id_pasaporte:
   *                         type: string
   *                         description: Identificación del pasaporte del pasajero.
   *                         example: "A12345678"
   *             required:
   *               - id_reserva
   *       responses:
   *         '200':
   *           description: Reserva actualizada exitosamente.
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   ok:
   *                     type: boolean
   *                     description: Indica si la operación fue exitosa.
   *                     example: true
   *                   mensaje:
   *                     type: string
   *                     description: Mensaje de confirmación.
   *                     example: "Reserva actualizada exitosamente"
   *         '404':
   *           description: Reserva no encontrada.
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   error:
   *                     type: string
   *                     description: Detalle del error.
   *                     example: "Reserva no encontrada"
   *         '500':
   *           description: Error del servidor.
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   error:
   *                     type: string
   *                     description: Detalle del error.
   *                     example: "Error interno del servidor"
   */
  router.put("/reserva", (req, res) => {  
    const { id_reserva, ids_asientos, datos_pasajeros } = req.body;  // Obtenemos el id_reserva y los datos del cuerpo de la solicitud
    
    reservaCtrl.actualizarReserva(Number(id_reserva), { ids_asientos, datos_pasajeros })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  //swagger 
  /** 
   * @swagger
   * /cancelarReserva/{id}:
   *   patch:
   *     description: Cancelar la reserva por ID
   *     tags:
   *       - Reserva
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID de la Reserva a eliminar
   *         required: true
   *         schema:
   *           type: number
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Reserva eliminada
   *       400:
   *         description: Error al eliminar la Reserva
   *   
   */
  router.patch("/cancelarReserva/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result =  await reservaCtrl.cancelarReserva(id);
       const status = result != null ? 200 : 400;
       res.status(status).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  });

  /**
   * @swagger
   * /reserva:
   *   get:
   *     description: Obtener todas las reservas disponibles en el sistema.
   *     tags:
   *       - Reserva
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Lista de reservas obtenida exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id_reserva:
   *                     type: number
   *                     description: ID único de la reserva.
   *                     example: 1
   *                   id_pasajero:
   *                     type: number
   *                     description: ID del pasajero asociado a la reserva.
   *                     example: 1
   *                   cantidad_pasajeros:
   *                     type: number
   *                     description: Número de pasajeros en la reserva.
   *                     example: 2
   *                   categoria:
   *                     type: string
   *                     description: Categoría de la reserva (e.g., económica, ejecutiva).
   *                     example: "económica"
   *                   precio_subtotal:
   *                     type: number
   *                     description: Subtotal del precio de la reserva.
   *                     example: 300.00
   *                   precio_total:
   *                     type: number
   *                     description: Precio total de la reserva.
   *                     example: 350.00
   *       500:
   *         description: Error al obtener las reservas.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Detalle del error.
   *                   example: "Error al obtener la reserva: [detalle del error]"
  */
  router.get("/reserva", (req, res) => { 
    reservaCtrl.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener la reserva:" + error ); // Manejo de errores
    });
  });

  /**
   * @swagger
   * /reserva/{id}:
   *   get:
   *     description: Obtener una reserva por su ID.
   *     tags:
   *       - Reserva
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID único de la reserva.
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Reserva encontrada con éxito.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 result:
   *                   type: object
   *                   properties:
   *                     id_reserva:
   *                       type: number
   *                       description: ID único de la reserva.
   *                       example: 1
   *                     id_pasajero:
   *                       type: number
   *                       description: ID del pasajero asociado a la reserva.
   *                       example: 456
   *                     cantidad_pasajeros:
   *                       type: number
   *                       description: Número de pasajeros en la reserva.
   *                       example: 2
   *                     categoria:
   *                       type: string
   *                       description: Categoría de la reserva (e.g., económica, ejecutiva).
   *                       example: "Económica"
   *                     precio_subtotal:
   *                       type: number
   *                       description: Subtotal del precio de la reserva.
   *                       example: 300.000
   *                     precio_total:
   *                       type: number
   *                       description: Precio total de la reserva.
   *                       example: 350.000
   *       400:
   *         description: Error en el ID enviado. El ID no es válido.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Error en el id enviado."
   *       404:
   *         description: No se encontró la reserva con el ID proporcionado.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Error"
   *       500:
   *         description: Error interno del servidor.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Error interno del servidor"
  */
  router.get("/reserva/:id", async (req, res) => { 
    try {
      const idStr = req.params.id;
       const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado." });
        return;
      }
      const result = await reservaCtrl.obtenerById(id);
      if (result != null) {
        res.send({ result });
      } else {
        res.status(404).send({ ok: false, message: "Error" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
