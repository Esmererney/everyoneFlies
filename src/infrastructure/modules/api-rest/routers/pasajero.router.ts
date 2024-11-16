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

  return router
}