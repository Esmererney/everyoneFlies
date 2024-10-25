import express from "express";

const middleware404 = express();

// Middlerware: Interceptar todas las respuestas al final de la ruta
middleware404.use((req, res, next) => {

  res.status(404).send({ok:false, message:"Ruta no encontrada"});
});

export default middleware404;
