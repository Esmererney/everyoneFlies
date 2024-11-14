import Express from "express";

import { getPoolConnectionPgs } from "./db/source.psg";
import { routes } from "./src/infraestuture/routes/routes.index";
import middleware404 from "./src/infraestuture/middleware/middleware";

const createServer = async () => {
  try {
    
  console.log('Entorno:', process.env.NODE_ENV);
   const conexion =  getPoolConnectionPgs();

   conexion.connect().then(() => {
    console.log('Conexión exitosa');
  }).catch((err) => {
    console.error('Error en la conexión', err);
  });


    console.log('Datasource inicializado' + conexion);
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
