'use strict'

const express = require("express");
const hotelControlador = require("../controladores/hotel.controlador");
const md_autenticacion = require("../middlewares/authenticated");

const api = express.Router();
api.post('/agregarHotel', md_autenticacion.ensureAuth, hotelControlador.agregarHotel);
api.get('/obtenerHoteles', md_autenticacion.ensureAuth, hotelControlador.obtenerHoteles);
api.get('/obtenerHotelId/:idHotel', md_autenticacion.ensureAuth, hotelControlador.obtenerHotel);
api.put('/editarHotel/:idHotel', hotelControlador.editarHotel);
api.put('/editarHotelADMIN/:idHotel', md_autenticacion.ensureAuth, hotelControlador.editarHotelADMIN);
api.delete('/eliminarHotel/:idHotel', hotelControlador.eliminarHotel);
api.delete('/eliminarHotelAdmin/:idHotel', md_autenticacion.ensureAuth, hotelControlador.eliminarHotelAdmin);

api.put('/agregarHabitacion/:idHotel', md_autenticacion.ensureAuth, hotelControlador.agregarHabitacionHotel);
api.put('/editarHabitacion/:idHabitacion', md_autenticacion.ensureAuth, hotelControlador.editarHabitacion);
api.get('/obtenerHabitacion/:idHabitacion', md_autenticacion.ensureAuth, hotelControlador.obtenerHabitacion);
api.delete('/eliminarHabitacion/:idHabitacion', md_autenticacion.ensureAuth, hotelControlador.eliminarHabitacion);

module.exports = api;


   