'use strict'

var Evento = require('../modelos/evento.model');
var mongoose = require('mongoose')

function agregarEvento(req, res) {
    var params = req.body;
    var eventoModel = new Evento();

    if(params.nombre && params.descripcion){
        eventoModel.nombre = params.nombre;
        eventoModel.descripcion = params.descripcion;
        eventoModel.idTipoEvento = params.idTipoEvento;
        eventoModel.idHotel = params.idHotel;
        eventoModel.fechaInicio = params.fechaInicio;
        eventoModel.fechaFinal = params.fechaFinal;
        eventoModel.monto = params.monto;
        eventoModel.imagen = params.imagen;
        eventoModel.creadorEvento = req.user.sub;
        
        eventoModel.save((err, eventoGuardado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del evento' });
            if(!eventoGuardado) return res.status(500).send({ mensaje: 'Error al agregar el evento' });

            return res.status(200).send({ eventoGuardado });
        })
    }else{
        res.status(500).send({
            mensaje: 'Rellene los datos necesarios para crear el evento'
        });
    }
}

function obtenerEventos(req, res) {
    Evento.find().populate('idHotel', 'nombre').populate('idTipoEvento','nombre').exec((err, eventosEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de eventos' });
        if(!eventosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los eventos' });
        return res.status(200).send({ eventosEncontrados });
    })
}

function obtenerEvento(req, res) {
    var idEvento = req.params.idEvento;

    Evento.findById(idEvento).populate('creadorEvento listaComentarios.idUsuarioComentario', 'usuario email imagen').exec((err, eventoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion del evento'});
        if(!eventoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el evento'});
        return res.status(200).send({ eventoEncontrado })
    })
}

function editarEvento(req, res) {
    var idEvento = req.params.idEvento;
    var params = req.body;

    Evento.findByIdAndUpdate(idEvento, params, { new: true }, (err, eventoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!eventoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el evento' });
        return res.status(200).send({ eventoActualizado });
    })  
}

function editarEventoADMIN(req, res) {
    var idEvento = req.params.idEvento;
    var params = req.body;

    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlos" })
    }

    Evento.findByIdAndUpdate(idEvento, params, { new: true }, (err, eventoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!eventoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el evento' });
        return res.status(200).send({ eventoActualizado });
    })
   
}

function eliminarEvento(req, res) {
    const idEvento = req.params.idEvento;

    Evento.findByIdAndDelete(idEvento, (err, eventoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!eventoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el evento.' });

        return res.status(200).send({ eventoEliminado });
    })
}

function eliminarEventoAdmin(req, res) {
    const idEvento = req.params.idEvento;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    Evento.findByIdAndDelete(idEvento, (err, eventoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!eventoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el evento.' });
        return res.status(200).send({ eventoEliminado });
    })
}

module.exports = {
    agregarEvento,
    obtenerEventos,
    obtenerEvento,
    editarEvento,
    editarEventoADMIN,
    eliminarEvento,
    eliminarEventoAdmin
}