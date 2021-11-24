'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var HabitacionSchema = Schema({
    nombre: String,
    descripcion: String,
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hoteles' },
    monto: Number,
    imagen: String,
    creadorHabitacion: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Habitaciones', HabitacionSchema);