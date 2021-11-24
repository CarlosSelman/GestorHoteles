'use strict'

const express = require("express");
const habitacionControlador = require("../controladores/habitacion.controlador");
const md_autenticacion = require("../middlewares/authenticated");

const api = express.Router();
api.post('/agregarHabitacion', md_autenticacion.ensureAuth, habitacionControlador.agregarHabitacion);
api.get('/obtenerHabitaciones', md_autenticacion.ensureAuth, habitacionControlador.obtenerHabitaciones);
api.get('/obtenerHabitacionId/:idHabitacion', md_autenticacion.ensureAuth, habitacionControlador.obtenerHabitacion);
api.put('/editarHabitacion/:idHabitacion', habitacionControlador.editarHabitacion);
api.put('/editarHabitacionADMIN/:idHabitacion', md_autenticacion.ensureAuth, habitacionControlador.editarHabitacionADMIN);
api.delete('/eliminarHabitacion/:idHabitacion', habitacionControlador.eliminarHabitacion);
api.delete('/eliminarHabitacionAdmin/:idHabitacion', md_autenticacion.ensureAuth, habitacionControlador.eliminarHabitacionAdmin);

module.exports = api;
