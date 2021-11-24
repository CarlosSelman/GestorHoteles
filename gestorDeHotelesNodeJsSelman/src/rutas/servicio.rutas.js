'use strict'

const express = require("express");
const servicioControlador = require("../controladores/servicio.controlador");
const md_autenticacion = require("../middlewares/authenticated");

const api = express.Router();
api.post('/agregarServicio', md_autenticacion.ensureAuth, servicioControlador.agregarServicio);
api.get('/obtenerServicios', md_autenticacion.ensureAuth, servicioControlador.obtenerServicios);
api.get('/obtenerServicioId/:idServicio', md_autenticacion.ensureAuth, servicioControlador.obtenerServicio);
api.put('/editarServicio/:idServicio', servicioControlador.editarServicio);
api.put('/editarServicioADMIN/:idServicio', md_autenticacion.ensureAuth, servicioControlador.editarServicioADMIN);
api.delete('/eliminarServicio/:idServicio', servicioControlador.eliminarServicio);
api.delete('/eliminarServicioAdmin/:idServicio', md_autenticacion.ensureAuth, servicioControlador.eliminarServicioAdmin);

module.exports = api;