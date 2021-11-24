'use strict'

var Servicio = require('../modelos/servicio.model');
var mongoose = require('mongoose')

function agregarServicio(req, res) {
    var params = req.body;
    var servicioModel = new Servicio();

    if(params.nombre && params.descripcion){
        servicioModel.nombre = params.nombre;
        servicioModel.descripcion = params.descripcion;
        servicioModel.monto = params.monto;
        servicioModel.imagen = params.imagen;
        servicioModel.creadorServicio = req.user.sub;
        
        servicioModel.save((err, servicioGuardado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del servicio' });
            if(!servicioGuardado) return res.status(500).send({ mensaje: 'Error al agregar el Servicio' });

            return res.status(200).send({ servicioGuardado });
        })
    }else{
        res.status(500).send({
            mensaje: 'Rellene los datos necesarios para crear el Servicio'
        });
    }
}

function obtenerServicios(req, res) {
    Servicio.find().populate('creadorServicio', 'nombre email').exec((err, serviciosEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de servicios' });
        if(!serviciosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los servicios' });
        return res.status(200).send({ serviciosEncontrados });
    })
}

function obtenerServicio(req, res) {
    var idServicio = req.params.idServicio;

    Servicio.findById(idServicio).populate('creadorServicio listaComentarios.idUsuarioComentario', 'usuario email imagen').exec((err, servicioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion del servicio'});
        if(!servicioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el servicio'});
        return res.status(200).send({ servicioEncontrado })
    })
}

function editarServicio(req, res) {
    var idServicio = req.params.idServicio;
    var params = req.body;

    Servicio.findByIdAndUpdate(idServicio, params, { new: true }, (err, servicioActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!servicioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el servicio' });
        return res.status(200).send({ servicioActualizado });
    })

    
}

function editarServicioADMIN(req, res) {
    var idServicio = req.params.idServicio;
    var params = req.body;

    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlos" })
    }

    Servicio.findByIdAndUpdate(idServicio, params, { new: true }, (err, servicioActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!servicioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el servicio' });
        return res.status(200).send({ servicioActualizado });
    })

    
}

function eliminarServicio(req, res) {
    const idServicio = req.params.idServicio;

    Servicio.findByIdAndDelete(idServicio, (err, servicioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!servicioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el servicio.' });

        return res.status(200).send({ servicioEliminado });
    })
}

function eliminarServicioAdmin(req, res) {
    const idServicio = req.params.idServicio;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    Servicio.findByIdAndDelete(idServicio, (err, servicioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!servicioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el servicio.' });
        return res.status(200).send({ servicioEliminado });
    })
}

module.exports = {
    agregarServicio,
    obtenerServicios,
    obtenerServicio,
    editarServicio,
    editarServicioADMIN,
    eliminarServicio,
    eliminarServicioAdmin
}