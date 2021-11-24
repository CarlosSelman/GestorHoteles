'use strict'

var TipoEvento = require('../modelos/tipoEvento.model');
var mongoose = require('mongoose')

function agregarTipoEvento(req, res) {
    var params = req.body;
    var tipoEventoModel = new TipoEvento();

    if(params.nombre && params.descripcion){
        tipoEventoModel.nombre = params.nombre;
        tipoEventoModel.descripcion = params.descripcion;
        tipoEventoModel.imagen = params.imagen;
        tipoEventoModel.creadorEvento = req.user.sub;
        
        tipoEventoModel.save((err, tipoEventoGuardado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Tipo Evento' });
            if(!tipoEventoGuardado) return res.status(500).send({ mensaje: 'Error al agregar el Tipo Evento' });

            return res.status(200).send({ tipoEventoGuardado });
        })
    }else{
        res.status(500).send({
            mensaje: 'Rellene los datos necesarios para crear el Tipo Evento'
        });
    }
}

function obtenerTiposEventos(req, res) {
    TipoEvento.find().populate('creadorEvento', 'nombre email').exec((err, tiposEventosEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Tipos de Eventos' });
        if(!tiposEventosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los Tipos de Eventos' });
        return res.status(200).send({ tiposEventosEncontrados });
    })
}

function obtenerTipoEvento(req, res) {
    var idTipoEvento = req.params.idTipoEvento;

    TipoEvento.findById(idTipoEvento).populate('creadorEvento listaComentarios.idUsuarioComentario', 'usuario email imagen').exec((err, tipoEventoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion del tipo evento'});
        if(!tipoEventoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el tipo evento'});
        return res.status(200).send({ tipoEventoEncontrado })
    })
}

function editarTipoEvento(req, res) {
    var idTipoEvento = req.params.idTipoEvento;
    var params = req.body;

    TipoEvento.findByIdAndUpdate(idTipoEvento, params, { new: true }, (err, tipoEventoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!tipoEventoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el tipo evento' });
        return res.status(200).send({ tipoEventoActualizado });
    })

    
}

function editarTipoEventoADMIN(req, res) {
    var idTipoEvento = req.params.idTipoEvento;
    var params = req.body;

    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlos" })
    }

    TipoEvento.findByIdAndUpdate(idTipoEvento, params, { new: true }, (err, tipoEventoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!tipoEventoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el tipo evento' });
        return res.status(200).send({ tipoEventoActualizado });
    })

    
}

function eliminarTipoEvento(req, res) {
    const idTipoEvento = req.params.idTipoEvento;

    TipoEvento.findByIdAndDelete(idTipoEvento, (err, tipoEventoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!tipoEventoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el tipo evento.' });

        return res.status(200).send({ tipoEventoEliminado });
    })
}

function eliminarTipoEventoAdmin(req, res) {
    const idTipoEvento = req.params.idTipoEvento;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    TipoEvento.findByIdAndDelete(idTipoEvento, (err, tipoEventoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!tipoEventoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el  tipo evento.' });
        return res.status(200).send({ tipoEventoEliminado });
    })
}

module.exports = {
    agregarTipoEvento,
    obtenerTiposEventos,
    obtenerTipoEvento,
    editarTipoEvento,
    editarTipoEventoADMIN,
    eliminarTipoEvento,
    eliminarTipoEventoAdmin
}