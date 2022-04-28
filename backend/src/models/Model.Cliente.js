const { Schema, model } = require("mongoose");

const clienteSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true
    },
    nombrecompleto: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    montopagado: {
      type: String,
      required: [true, "Por favor ingresar su monto pagado!"]
    },
    detalle: {
      type: String,
      required: [true, "Por favor ingresar un detalle!"],
      trim: true,
    },
    fechaventa: {
      type: Date,
      required: true,
      default: new Date()
    },
    reservacion: {
      type: String,
      required: [true, "Por favor ingresar una reservacion!"]
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    }
  },
  { timestamps: true, versionKey: false }
);

/*
•	Código.
•	Nombre del cliente.
•	Monto Pagado.
•	Detalle: Todo lo consumido por el o los clientes.
•	Fecha: día en el que se realizó la venta.
•	Reservación: si reservó o no una mesa.
•	Restaurante: Nombre del Restaurante, donde se hace la venta.

*/

module.exports = model("cliente", clienteSchema);
