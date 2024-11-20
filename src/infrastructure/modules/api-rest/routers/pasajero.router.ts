import express from "express";
import { PasajeroController } from '../../../../application/pasajero.controller';

export const PasajeroRouter = () => {
    const router = express.Router()

    const pasajeroCtrl = new PasajeroController();

  router.post("/pasajero", (req, res) => {
    // Capturando el body que el cliente envia en la solitud
    const payload = req.body;
    // Resolver la promesa con then-catch del controlador
    pasajeroCtrl
      .agregar(payload)
      .then((result) => {
        
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/pasajero", (req, res) => {
    const id = req.query.id
    pasajeroCtrl
      .obtenerPorId(Number(id))
      .then((result) => {
        const status = result.ok === true ? 200 : 404;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/pasajeros", (req, res) => {
    pasajeroCtrl
      .obtener()
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.patch("/pasajero", (req, res) => {
    const payload = req.body;
    pasajeroCtrl
      .actualizar(payload)
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/pasajero/buscar", (req, res) => {
    const payload = req.body;
    pasajeroCtrl
      .obtenerPorCriterio(payload)
      .then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });



  return router
}