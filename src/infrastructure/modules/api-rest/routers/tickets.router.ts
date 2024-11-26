import Express from "express";
import { TicketsController } from "../../../../application/tickets.controller"


// import { ProductoController } from "";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta

export const RutasTicket = () => {
  
  const router = Express.Router();
   const ticketCtrl = new TicketsController();


   
   router.post("/check", async (req, res) => {
    try {
      const payload = req.body;
      // Llamar al controlador para crear la reserva
      const result = await ticketCtrl.check(payload);
      // Enviar la respuesta
      res.status(201).send(result);
    } catch (error: any) {
      console.error('Error :', error);
      // Enviar un error genérico con un código de estado adecuado
      res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
  });

  router.get("/ticket", (req, res) => { 
    ticketCtrl.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener el ticket:" + error ); // Manejo de errores
    });
  });

  router.post("/ticket", (req, res) => { 
    const payload = req.body;
    ticketCtrl.agregar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  router.put("/ticket", (req, res) => {  
    const payload = req.body;
    ticketCtrl.actualizar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  router.get("/ticket/:id", async (req, res) => { 

    try {
      const idStr = req.params.id;
       const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado." });
        return;
      }
      const result = await ticketCtrl.obtenerById(id);
      if (result != null) {
        res.send({ result });
      } else {
        res.status(404).send({ ok: false, message: "Error" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete("/ticket/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result =  await ticketCtrl.eliminar(id);
       const status = result != null ? 200 : 400;
       res.status(status).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  });


  return router;

};