import Express from "express";
import { CategoriaController } from "../../../application/categoria.controller";

export const RutasCategoria = () => {
  
  const router = Express.Router();
  const categoriaCtrl = new CategoriaController();

  // Ruta para obtener todas las categorías
  router.get("/categorias", (req, res) => { 
    categoriaCtrl.obtener().then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send("Error al obtener las categorías: " + error); // Manejo de errores
    });
  });

  // Ruta para agregar una nueva categoría
  router.post("/categorias", (req, res) => { 
    const payload = req.body;
    categoriaCtrl.agregar(payload).then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send("Error al agregar la categoría: " + error);
    });
  });

  // Ruta para actualizar una categoría
  router.put("/categorias", (req, res) => {  
    const payload = req.body;
    categoriaCtrl.actualizar(payload).then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send("Error al actualizar la categoría: " + error);
    });
  });

  // Ruta para obtener una categoría por su ID
  router.get("/categorias/:id", async (req, res) => { 
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado. Debe ser un número válido." });
        return;
      }
      const result = await categoriaCtrl.obtenerPorId(id);
      if (result != null) {
        res.send({ result });
      } else {
        res.status(404).send({ ok: false, message: "La categoría no fue encontrada." });
      }
    } catch (error) {
      res.status(500).send("Error al obtener la categoría: " + error);
    }
  });

  // Ruta para eliminar una categoría por su ID
  router.delete("/categorias/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado. Debe ser un número válido." });
        return;
      }
      const result = await categoriaCtrl.eliminar(id);
      const status = result != null ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send("Error al eliminar la categoría: " + error);
    }
  });

  return router;
};
