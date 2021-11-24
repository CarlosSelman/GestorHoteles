'use strict'

const express = require("express");
const eventoControlador = require("../controladores/evento.controlador");
const md_autenticacion = require("../middlewares/authenticated");

const api = express.Router();
api.post('/agregarEvento', md_autenticacion.ensureAuth, eventoControlador.agregarEvento);
api.get('/obtenerEventos', md_autenticacion.ensureAuth, eventoControlador.obtenerEventos);
api.get('/obtenerEventoId/:idEvento', md_autenticacion.ensureAuth, eventoControlador.obtenerEvento);
api.put('/editarEvento/:idEvento', eventoControlador.editarEvento);
api.put('/editarEventoADMIN/:idEvento', md_autenticacion.ensureAuth, eventoControlador.editarEventoADMIN);
api.delete('/eliminarEvento/:idEvento', eventoControlador.eliminarEvento);
api.delete('/eliminarEventoAdmin/:idEvento', md_autenticacion.ensureAuth, eventoControlador.eliminarEventoAdmin);

module.exports = api;
