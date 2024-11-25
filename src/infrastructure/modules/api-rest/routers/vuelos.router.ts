import Express from "express";
import { VueloController } from "../../../../application/vuelo.Controller";

// import { ProductoController } from "";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta

export const RutasVuelo = () => {
  
  const router = Express.Router();
   const vueloCtrl = new VueloController();

  router.get("/vuelos", (req, res) => { 
    vueloCtrl.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener el vuelo:" + error ); // Manejo de errores
    });
  });

  router.post("/vuelos", (req, res) => { 
    const payload = req.body;
    vueloCtrl.agregar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  router.put("/vuelos", (req, res) => {  
    const payload = req.body;
    vueloCtrl.actualizar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  router.get("/vuelos/:id", async (req, res) => { 

    try {
      const idStr = req.params.id;
       const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado .Debe ser un número válido." });
        return;
      }
      const result = await vueloCtrl.obtenerPorId(id);
      if (result != null) {
        res.send({ result });
      } else {
        res.status(404).send({ ok: false, message: "Erroor" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete("/vuelos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result =  await vueloCtrl.eliminar(id);
       const status = result != null ? 200 : 400;
       res.status(status).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
  });

  router.patch("/vuelos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
  
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "El ID proporcionado no es válido" });
        return;
      }
  
      const datos = req.body;
  
      const resultado = await vueloCtrl.actualizarParcial(id, datos);
      if (resultado.ok) {
        res.status(200).send(resultado);
      } else {
        res.status(400).send(resultado);
      }
    } catch (error) {
      console.error("Error al actualizar vuelo:", error);
      res.status(500).send({ ok: false, message: "Error interno del servidor", error });
    }
  });


  //Ruta del cliente
  router.post("/vuelos/buscar", async (req, res) => {
    const { origen_aeropuerto, destino_aeropuerto, fecha_salida } = req.body;

    if (!origen_aeropuerto || !destino_aeropuerto || !fecha_salida) {
      res.status(400).send({ ok: false, message: "Faltan parámetros de búsqueda" });
    }
  
    try {
      const result = await vueloCtrl.buscarVuelos(origen_aeropuerto, destino_aeropuerto, fecha_salida);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ ok: false, message: "Error al buscar vuelos", error });
    }
  });


  return router;

};