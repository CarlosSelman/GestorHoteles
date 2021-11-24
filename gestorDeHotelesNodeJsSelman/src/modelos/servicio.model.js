'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ServicioSchema = Schema({
    nombre: String,
    descripcion: String,
    monto: Number,
    imagen: String,
    creadorServicio: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Servicios', ServicioSchema);