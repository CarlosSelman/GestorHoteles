export class Evento{
  constructor(
    public _id: String,
    public nombre: String,
    public descripcion: String,
    public idTipoEvento: String,
    public idHotel: String,
    public fechaInicio: String,
    public fechaFinal: String,
    public monto: Number,
    public imagen: String,
    public creadorEvento: String
  ){}
}

