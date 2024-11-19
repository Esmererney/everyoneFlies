import Express from "express";
import { RutasReserva } from "./reserva.router";
import { RutasTicket } from "./tickets.router";

export const Routes = () => {
  const router = Express.Router();
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
  
  router.use(RutasReserva());
  return router;
};
