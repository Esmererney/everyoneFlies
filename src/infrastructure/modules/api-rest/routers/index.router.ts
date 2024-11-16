import Express from "express";
import { PasajeroRouter } from "./pasajero.router";

export const routes = () => {
  const router = Express.Router();
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
  
  router.use(PasajeroRouter());
  return router;
};