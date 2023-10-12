const express = require("express");

const userRoutes = require("./user.js");
const medidorRoutes = require("./medidor.js");

const app = express();

app.use("/user", userRoutes);
app.use("/medidor", medidorRoutes);

module.exports = app;
