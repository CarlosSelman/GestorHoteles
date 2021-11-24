export class Reservacion{
  constructor(
    public _id: String,
    public nombre: String,
    public descripcion: String,
    public idHabitacion: String,
    public fechaInicio: String,
    public fechaFinal: String,
    public monto: Number,
    public imagen: String,
    public creadorReservacion: String
  ){}
}
