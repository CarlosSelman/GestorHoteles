export class Hotel{
  constructor(
    public _id: String,
    public nombre: String,
    public descripcion: String,
    public direccion: String,
    public imagen: String,
    public administradorHotel: String,
    public opinion: {
      si: Number,
      no: Number,
      ninguna: Number,
      usuarioEncuestados: []
    },
    public listaHabitaciones: [{
        nombre: String,
        descripcion: String,
        monto: Number,
        imagen: String,
        idUsuarioCreador: String,

      }],

    public creadorHotel: String

  ){}
}
