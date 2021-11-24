'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

// IMPORTACION RUTAS
const usuario_ruta = require("./src/rutas/usuario.rutas");
const servicio_ruta = require("./src/rutas/servicio.rutas");
const hotel_ruta = require("./src/rutas/hotel.rutas");
const habitacion_ruta = require("./src/rutas/habitacion.rutas");
const tipoEvento_ruta = require("./src/rutas/tipoEvento.rutas");
const evento_ruta = require("./src/rutas/evento.rutas");
const reservacion_ruta = require("./src/rutas/reservacion.rutas");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerUsuarios
app.use('/api', usuario_ruta,servicio_ruta,hotel_ruta,tipoEvento_ruta,evento_ruta,habitacion_ruta,reservacion_ruta);

//EXPORTAR
module.exports = app;