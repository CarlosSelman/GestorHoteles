export class Habitacion{
  constructor(
    public _id: String,
    public nombre: String,
    public descripcion: String,
    public idHotel: String,
    public monto: Number,
    public imagen: String,
    public creadorHabitacion: String
  ){}
}
