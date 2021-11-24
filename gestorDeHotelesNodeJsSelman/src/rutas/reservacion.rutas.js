'use strict'

const express = require("express");
const reservacionControlador = require("../controladores/reservacion.controlador");
const md_autenticacion = require("../middlewares/authenticated");

const api = express.Router();
api.post('/agregarReservacion', md_autenticacion.ensureAuth, reservacionControlador.agregarReservacion);
api.get('/obtenerReservaciones', md_autenticacion.ensureAuth, reservacionControlador.obtenerReservaciones);
api.get('/obtenerReservacionId/:idReservacion', md_autenticacion.ensureAuth, reservacionControlador.obtenerReservacion);
api.put('/editarReservacion/:idReservacion', reservacionControlador.editarReservacion);
api.put('/editarReservacionADMIN/:idReservacion', md_autenticacion.ensureAuth, reservacionControlador.editarReservacionADMIN);
api.delete('/eliminarReservacion/:idReservacion', reservacionControlador.eliminarReservacion);
api.delete('/eliminarReservacionAdmin/:idReservacion', md_autenticacion.ensureAuth, reservacionControlador.eliminarReservacionAdmin);

module.exports = api;