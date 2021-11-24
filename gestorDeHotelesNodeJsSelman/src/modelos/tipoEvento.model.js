'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TipoEventoSchema = Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    creadorEvento: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('TipoEventos', TipoEventoSchema);


