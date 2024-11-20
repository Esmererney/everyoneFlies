import Express from "express";
import { RutasVuelo } from "./routes.vuelos";
import { RutasAsiento } from "./routes.asientos";
import { RutasCategoria } from "./routes.categorias";
import { RutasPreciosTemporales } from "./routes.precios_temporales";

export const routes = () => {
  const router = Express.Router();
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
  
  router.use(RutasVuelo());
  router.use(RutasAsiento());
  router.use(RutasCategoria());
  router.use(RutasPreciosTemporales());

  return router;
};
