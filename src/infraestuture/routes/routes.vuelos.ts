import Express from "express";
import { VueloController } from "../../application/vuelo.Controller";


// import { ProductoController } from "";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta

export const RutasVuelo = () => {
  
  const router = Express.Router();
   const vueloContr = new VueloController();

  router.get("/vuelo", (req, res) => { 
    vueloContr.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener el vuelo:" + error ); // Manejo de errores
    });
  });

  router.post("/Vuelo", (req, res) => { 
    const payload = req.body;
    vueloContr.agregar(payload).then((result) => {
      res.send(result);
    })
      .catch((error) => {
        res.status(505).send(error);
      });
  });

  router.put("/Vuelo", (req, res) => {  });

  router.get("/Vuelo/:id", async (req, res) => { });

  router.delete("/Vuelo/:id", async (req, res) => { });

  return router;

};
