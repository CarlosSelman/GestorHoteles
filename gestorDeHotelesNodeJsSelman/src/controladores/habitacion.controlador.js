'use strict'

var Habitacion = require('../modelos/habitacion.model');
var mongoose = require('mongoose')

function agregarHabitacion(req, res) {
    var params = req.body;
    var habitacionModel = new Habitacion();

    if(params.nombre && params.descripcion){
        habitacionModel.nombre = params.nombre;
        habitacionModel.descripcion = params.descripcion;
        habitacionModel.idHotel = params.idHotel;
        habitacionModel.monto = params.monto;
        habitacionModel.imagen = params.imagen;
        habitacionModel.creadorHabitacion = req.user.sub;
        
        habitacionModel.save((err, habitacionGuardada)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la habitacion' });
            if(!habitacionGuardada) return res.status(500).send({ mensaje: 'Error al agregar la habitacion' });

            return res.status(200).send({ habitacionGuardada });
        })
    }else{
        res.status(500).send({
            mensaje: 'Rellene los datos necesarios para crear la habitacion'
        });
    }
}

function obtenerHabitaciones(req, res) {
    Habitacion.find().populate('creadorHabitacion', 'nombre email').populate('idHotel', 'nombre').exec((err, habitacionesEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de habitaciones' });
        if(!habitacionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las habitaciones' });
        return res.status(200).send({ habitacionesEncontradas });
    })
}

function obtenerHabitacion(req, res) {
    var idHabitacion = req.params.idHabitacion;

    Habitacion.findById(idHabitacion).populate('creadorHabitacion listaComentarios.idUsuarioComentario', 'usuario email imagen').exec((err, habitacionEncontrada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de la habitacion'});
        if(!habitacionEncontrada) return res.status(500).send({ mensaje: 'Error al obtener la habitacion'});
        return res.status(200).send({ habitacionEncontrada })
    })
}

function editarHabitacion(req, res) {
    var idHabitacion = req.params.idHabitacion;
    var params = req.body;

    Habitacion.findByIdAndUpdate(idHabitacion, params, { new: true }, (err, habitacionActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!habitacionActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la habitacion' });
        return res.status(200).send({ habitacionActualizada });
    })  
}

function editarHabitacionADMIN(req, res) {
    var idHabitacion = req.params.idHabitacion;
    var params = req.body;

    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlos" })
    }

    Habitacion.findByIdAndUpdate(idHabitacion, params, { new: true }, (err, habitacionActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!habitacionActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la habitacion' });
        return res.status(200).send({ habitacionActualizada });
    })
   
}

function eliminarHabitacion(req, res) {
    const idHabitacion = req.params.idHabitacion;

    Habitacion.findByIdAndDelete(idHabitacion, (err, habitacionEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!habitacionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la habitacion.' });

        return res.status(200).send({ habitacionEliminada });
    })
}

function eliminarHabitacionAdmin(req, res) {
    const idHabitacion = req.params.idHabitacion;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    Habitacion.findByIdAndDelete(idHabitacion, (err, habitacionEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!habitacionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la habitacion.' });
        return res.status(200).send({ habitacionEliminada });
    })
}

module.exports = {
    agregarHabitacion,
    obtenerHabitaciones,
    obtenerHabitacion,
    editarHabitacion,
    editarHabitacionADMIN,
    eliminarHabitacion,
    eliminarHabitacionAdmin
}