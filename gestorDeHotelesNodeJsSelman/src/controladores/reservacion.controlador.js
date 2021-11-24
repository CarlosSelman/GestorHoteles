'use strict'

var Reservacion = require('../modelos/reservacion.model');
var mongoose = require('mongoose')

function agregarReservacion(req, res) {
    var params = req.body;
    var reservacionModel = new Reservacion();

    if(params.nombre && params.descripcion){
        reservacionModel.nombre = params.nombre;
        reservacionModel.descripcion = params.descripcion;
        reservacionModel.idHabitacion = params.idHabitacion;
        reservacionModel.fechaInicio = params.fechaInicio;
        reservacionModel.fechaFinal = params.fechaFinal;
        reservacionModel.monto = params.monto;
        reservacionModel.imagen = params.imagen;
        reservacionModel.creadorReservacion = req.user.sub;
        
        reservacionModel.save((err, reservacionGuardada)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la reservacion' });
            if(!reservacionGuardada) return res.status(500).send({ mensaje: 'Error al agregar la reservacion' });

            return res.status(200).send({ reservacionGuardada });
        })
    }else{
        res.status(500).send({
            mensaje: 'Rellene los datos necesarios para crear la reservacion'
        });
    }
}

function obtenerReservaciones(req, res) {
    Reservacion.find().populate('idHabitacion', 'nombre').populate('creadorReservacion', 'nombre').exec((err, reservacionesEncontradas)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de reservaciones' });
        if(!reservacionesEncontradas) return res.status(500).send({ mensaje: 'Error al obtener las reservaciones' });
        return res.status(200).send({ reservacionesEncontradas });
    })
}

function obtenerReservacion(req, res) {
    var idReservacion = req.params.idReservacion;

    Reservacion.findById(idReservacion).populate('creadorReservacion listaComentarios.idUsuarioComentario', 'usuario email imagen').exec((err, reservacionEncontrada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de reservacion'});
        if(!reservacionEncontrada) return res.status(500).send({ mensaje: 'Error al obtener la reservacion'});
        return res.status(200).send({ reservacionEncontrada })
    })
}

function editarReservacion(req, res) {
    var idReservacion = req.params.idReservacion;
    var params = req.body;

    Reservacion.findByIdAndUpdate(idReservacion, params, { new: true }, (err, reservacionActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!reservacionActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la reservacion' });
        return res.status(200).send({ reservacionActualizada });
    })  
}

function editarReservacionADMIN(req, res) {
    var idReservacion = req.params.idReservacion;
    var params = req.body;

    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlas" })
    }

    Reservacion.findByIdAndUpdate(idReservacion, params, { new: true }, (err, reservacionActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!reservacionActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la reservacion' });
        return res.status(200).send({ reservacionActualizada });
    })
   
}

function eliminarReservacion(req, res) {
    const idReservacion = req.params.idReservacion;

    Reservacion.findByIdAndDelete(idReservacion, (err, reservacionEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!reservacionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la reservacion.' });

        return res.status(200).send({ reservacionEliminada });
    })
}

function eliminarReservacionAdmin(req, res) {
    const idReservacion = req.params.idReservacion;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    Reservacion.findByIdAndDelete(idReservacion, (err, reservacionEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!reservacionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la reservacion.' });
        return res.status(200).send({ reservacionEliminada });
    })
}

module.exports = {
    agregarReservacion,
    obtenerReservaciones,
    obtenerReservacion,
    editarReservacion,
    editarReservacionADMIN,
    eliminarReservacion,
    eliminarReservacionAdmin
}