import Express from "express";

import { AppDataSourcePgs } from "./src/Infrastructure/db/source.orm.pgs";
import { routes } from "./src/Infrastructure/api-rest/routes/routes.index";
import { AppDataSourceMysql } from "./src/Infrastructure/db/source.orm";
import middleware404 from "./src/Infrastructure/api-rest/middleware/middleware";

const createServer = async () => {
  try {

    console.log("Entorno:", process.env.NODE_ENV);

    AppDataSourcePgs.initialize().then(() => {
        console.log("Conexión exitosa");
      }).catch((err) => {
        console.error("Error en la conexión", err);
      });

      //AppDataSourceMysql.initialize().then(() => {
      //     console.log("Conexión exitosa");
      //   }).catch((err) => {
      //     console.error("Error en la conexión", err);
      // });

    console.log("Datasource inicializado");

    const app = Express();
    app.use(Express.json());

    app.get("/api", (req, res) => {
      res.send({ message: "Bienvenido a la API " });
    });

    app.use("/api/v1", routes());
    app.use(middleware404);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
    });
  } 
  catch (error) {
    console.error(error);
    console.error(`Error al iniciar el servidor web: ${error}`);
   }

};

createServer();
