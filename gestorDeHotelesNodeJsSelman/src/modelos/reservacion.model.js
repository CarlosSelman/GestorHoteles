'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReservacionSchema = Schema({
    nombre: String,
    descripcion: String,
    idHabitacion: { type: Schema.Types.ObjectId, ref: 'Habitaciones' },
    fechaInicio: Date,
    fechaFinal: Date,
    monto: Number,
    imagen: String,
    creadorReservacion: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Reservaciones', ReservacionSchema);