const { Schema, model } = require("mongoose");

const clienteSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: String,
      required: true
    },
    NombreCompleto: {
      type: String,
      required: [true, "Por favor ingresar su nombre!"],
      trim: true,
    },
    MontoPagado: {
      type: String,
      required: [true, "Por favor ingresar su monto pagado!"]
    },
    Detalle: {
      type: String,
      required: [true, "Por favor ingresar un detalle!"],
      trim: true,
    },
    FechaVenta: {
      type: Date,
      required: true,
      default: new Date()
    },
    Reservacion: {
      type: String,
      required: [true, "Por favor ingresar una reservacion!"]
    },
    Restaurante: {
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
