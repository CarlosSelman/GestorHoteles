'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    descripcion: String,
    direccion: String,
    imagen: String,
    administradorHotel: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
    
    opinion: {
        si: Number,
        no: Number,
        ninguna: Number,
        usuariosEncuestados: []
    },

    listaHabitaciones: [{

        nombre: String,
        descripcion: String,
        monto: Number,
        imagen: String,
        idUsuarioCreador: { type: Schema.Types.ObjectId, ref: 'Usuarios'} , 
        
    }],
    
    creadorHotel: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model('Hoteles', HotelSchema);