'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var EventoSchema = Schema({
    nombre: String,
    descripcion: String,
    idTipoEvento: { type: Schema.Types.ObjectId, ref: 'TipoEventos' },
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hoteles' },
    fechaInicio: Date,
    fechaFinal: Date,
    monto: Number,
    imagen: String,
    creadorEvento: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Eventos', EventoSchema);