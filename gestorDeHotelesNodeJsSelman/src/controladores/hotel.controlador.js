'use strict'

var Hotel = require('../modelos/hotel.model');
var mongoose = require('mongoose')

function agregarHotel(req, res) {
    var params = req.body;
    var hotelModel = new Hotel();
    console.log(params);
    if(params.nombre && params.descripcion){
        hotelModel.nombre = params.nombre;
        hotelModel.descripcion = params.descripcion;
        hotelModel.direccion = params.direccion;
        hotelModel.imagen = params.imagen;
        hotelModel.administradorHotel = params.administradorHotel;
        hotelModel.opinion = {
            si: 0,
            no:0,
            ninguna:0,
            usuariosEncuestados: []
        };
        hotelModel.creadorHotel = req.user.sub;
        hotelModel.save((err, hotelGuardado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del hotel' });
            if(!hotelGuardado) return res.status(500).send({ mensaje: 'Error al agregar el hotel' });

            return res.status(200).send({ hotelGuardado });
           })
        }else{
            res.status(500).send({
                mensaje: 'Rellene los datos necesarios para crear el Hotel'
                
            });
            
    }
}

function obtenerHoteles(req, res) {
    Hotel.find().populate('administradorHotel', 'nombre').exec((err, hotelesEncontrados)=>{
        console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de hoteles' });
        if(!hotelesEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los hoteles' });
        return res.status(200).send({ hotelesEncontrados });
    })
}

function obtenerHotel(req, res) {
    var idHotel = req.params.idHotel;

    Hotel.findById(idHotel).populate('administradorHotel', 'nombre').exec((err, hotelEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion del hotel'});
        if(!hotelEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el hotel'});
        return res.status(200).send({ hotelEncontrado })
    })
}

function editarHotel(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;

    Hotel.findByIdAndUpdate(idHotel, params, { new: true }, (err, hotelActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!hotelActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el hotel' });
        return res.status(200).send({ hotelActualizado });
    })

    
}

function editarHotelADMIN(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;

    if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlos" })
    }

    Hotel.findByIdAndUpdate(idHotel, params, { new: true }, (err, hotelActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!hotelActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el hotel' });
        return res.status(200).send({ hotelActualizado });
    })

    
}

function eliminarHotel(req, res) {
    const idHotel = req.params.idHotel;

    Hotel.findByIdAndDelete(idHotel, (err, hotelEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!hotelEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el hotel.' });

        return res.status(200).send({ hotelEliminado });
    })
}

function eliminarHotelAdmin(req, res) {
    const idHotel = req.params.idHotel;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'Solo puede eliminar el Administrador.'})
    }

    Hotel.findByIdAndDelete(idHotel, (err, hotelEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!hotelEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el hotel.' });
        return res.status(200).send({ hotelEliminado });
    })
}
//
function agregarHabitacionHotel(req, res) {
    var hotelID = req.params.idHotel;
    var params = req.body;

    Hotel.findByIdAndUpdate(hotelID, { $push: { listaHabitaciones: { 
        nombre: params.nombre,
        descripcion: params.descripcion, 
        monto: params.monto, 
        imagen: params.imagen, 
        idUsuarioCreador: req.user.sub } } },
        {new: true}, (err, habitacionAgregada)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de la habitacion' });
            if(!habitacionAgregada) return res.status(500).send({ mensaje: 'Error al agregar la habitacion del hotel' });
            return res.status(200).send({ habitacionAgregada });
        })
}

function editarHabitacion(req, res) {
   
    var habitacionId = req.params.idHabitacion;
    var params = req.body;
   

    if(req.user.rol==="ROL_ADMIN"){

        Hotel.findOneAndUpdate(
            {"listaHabitaciones._id": habitacionId /*, 'listaHabitaciones.idUsuarioCreador': req.user.sub*/ }, 
    
            { "listaHabitaciones.$.nombre": params.nombre , 
             "listaHabitaciones.$.descripcion": params.descripcion , 
             "listaHabitaciones.$.monto": params.monto },
          
        {new: true, useFindAndModify: false}, (err, habitacionEditada)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion de la habitacion' });
            if(!habitacionEditada) return res.status(500).send({ mensaje: 'No posee los permisos para editar esta habitacion' });
            return res.status(200).send( {habitacionEditada} )
        } )

    }


   
}

function obtenerHabitacion(req, res) {
    
    var habitacionId = req.params.idHabitacion;

    Hotel.findOne({"listaHabitaciones._id": habitacionId }, { "listaHabitaciones.$": 1, titulo: 1, creadorHotel:1 }, (err, habitacionEncontrada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de hoteles' });
        if(!habitacionEncontrada) return res.status(500).send({ mensaje: 'Error al obtener lla habitacion' });
        return res.status(200).send({ habitacionEncontrada })
    })
}

function eliminarHabitacion(req, res) {
    var habitacionId = req.params.idHabitacion;
   
    Hotel.findOneAndUpdate({ "listaHabitaciones._id" : habitacionId}, { $pull: { listaHabitaciones : { _id: habitacionId } } },
    {new: true, useFindAndModify: false},(err, habitacionEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de habitacion'});
        if(!habitacionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la habitacion' });

        return res.status(200).send({ habitacionEliminada })
    })
}

module.exports = {
    agregarHotel,
    obtenerHoteles,
    obtenerHotel,
    editarHotel,
    editarHotelADMIN,
    eliminarHotel,
    eliminarHotelAdmin,
    
    agregarHabitacionHotel,
    editarHabitacion,
    obtenerHabitacion,
    eliminarHabitacion
}