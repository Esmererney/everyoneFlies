import Express from "express";
import { RutasVuelo } from "./routes.vuelos";

export const routes = () => {
  const router = Express.Router();
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
  
  router.use(RutasVuelo());
  return router;
};
