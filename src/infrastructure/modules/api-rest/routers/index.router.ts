import Express from "express";
import { PasajeroRouter } from "./pasajero.router";
import { RutasReserva } from "./reserva.router";
import { RutasTicket } from "./tickets.router";

export const routes = () => {
  const router = Express.Router();
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
  
  router.use(PasajeroRouter());
  router.use(RutasReserva());
  router.use(RutasTicket());
  return router;
};