import Express from "express";
import { ReservaController } from "../../../../application/reserva.controller"


// import { ProductoController } from "";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta

export const RutasReserva = () => {
  
  const router = Express.Router();
   const reservaCtrl = new ReservaController();

  router.get("/reserva", (req, res) => { 
    reservaCtrl.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener la reserva:" + error ); // Manejo de errores
    });
  });

  router.post("/reserva", (req, res) => { 
    const payload = req.body;
    reservaCtrl.agregar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  router.put("/reserva", (req, res) => {  
    const payload = req.body;
    reservaCtrl.actualizar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

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

  router.delete("/reserva/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result =  await reservaCtrl.eliminar(id);
       const status = result != null ? 200 : 400;
       res.status(status).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  });

  router.post("/agregarReserva", async (req, res) => {
    try {
      const payload = req.body;
      
      // Llamar al controlador para crear la reserva
      const result = await reservaCtrl.crearReserva(payload);
  
      // Enviar la respuesta
      res.status(201).send(result);
    } catch (error: any) {
      console.error('Error al crear la reserva:', error);
  
      // Enviar un error genérico con un código de estado adecuado
      res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
  });
  


  return router;

};
