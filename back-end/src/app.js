const express = require("express");
const cookieParser = require("cookie-parser");
//const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerSpec = require("../swaggerConfig"); // Asegúrate de que esta ruta sea correcta

const routes = require("./routes/index.js");

//require DB
require("./db.js");

const server = express();

server.name = "API";

server.use(cors());

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Especificación OpenAPI (OAS) que estás utilizando
    info: {
      title: "API Documentation", // Título de tu documentación
      version: "1.0.0", // Versión de tu API
      description: "Descripción de tu API", // Descripción opcional
    },
  },
  // Especifica la ubicación de tus rutas que contienen anotaciones Swagger
  apis: ["./src/routes/*.js"],
};

// Crea un objeto SwaggerDocs con las opciones anteriores
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configura Swagger UI en una ruta específica, por ejemplo, /api-docs
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
