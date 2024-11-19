import Express from "express";
import { AsientoController } from "../../../application/asiento.controller";

export const RutasAsiento = () => {
  
  const router = Express.Router();
  const asientoCtrl = new AsientoController();

  // Ruta para obtener todos los asientos
  router.get("/asientos", (req, res) => { 
    asientoCtrl.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener los asientos: " + error); // Manejo de errores
    });
  });

  // Ruta para agregar un nuevo asiento
  router.post("/asientos", (req, res) => { 
    const payload = req.body;
    asientoCtrl.agregar(payload).then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send("Error al agregar el asiento: " + error);
    });
  });

  // Ruta para actualizar un asiento
  router.put("/asientos", (req, res) => {  
    const payload = req.body;
    asientoCtrl.actualizar(payload).then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send("Error al actualizar el asiento: " + error);
    });
  });

  // Ruta para obtener un asiento por su ID
  router.get("/asientos/:id", async (req, res) => { 
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado. Debe ser un número válido." });
        return;
      }
      const result = await asientoCtrl.obtenerPorId(id);
      if (result != null) {
        res.send({ result });
      } else {
        res.status(404).send({ ok: false, message: "El asiento no fue encontrado." });
      }
    } catch (error) {
      res.status(500).send("Error al obtener el asiento: " + error);
    }
  });

  // Ruta para eliminar un asiento por su ID
  router.delete("/asientos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado. Debe ser un número válido." });
        return;
      }
      const result = await asientoCtrl.eliminar(id);
      const status = result != null ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send("Error al eliminar el asiento: " + error);
    }
  });

  return router;
};
