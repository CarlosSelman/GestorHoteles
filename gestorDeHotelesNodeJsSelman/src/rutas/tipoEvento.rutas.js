'use strict'

const express = require("express");
const tipoEventoControlador = require("../controladores/tipoEvento.controlador");
const md_autenticacion = require("../middlewares/authenticated");

const api = express.Router();
api.post('/agregarTipoEvento', md_autenticacion.ensureAuth, tipoEventoControlador.agregarTipoEvento);
api.get('/obtenerTiposEventos', md_autenticacion.ensureAuth, tipoEventoControlador.obtenerTiposEventos);
api.get('/obtenerTipoEventoId/:idTipoEvento', md_autenticacion.ensureAuth, tipoEventoControlador.obtenerTipoEvento);
api.put('/editarTipoEvento/:idTipoEvento', tipoEventoControlador.editarTipoEvento);
api.put('/editarTipoEventoADMIN/:idTipoEvento', md_autenticacion.ensureAuth, tipoEventoControlador.editarTipoEventoADMIN);
api.delete('/eliminarTipoEvento/:idTipoEvento', tipoEventoControlador.eliminarTipoEvento);
api.delete('/eliminarTipoEventoAdmin/:idTipoEvento', md_autenticacion.ensureAuth, tipoEventoControlador.eliminarTipoEventoAdmin);

module.exports = api;