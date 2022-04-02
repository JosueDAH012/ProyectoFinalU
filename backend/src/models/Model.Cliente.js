const { Schema, model } = require("mongoose");

const clienteSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true
    },
    Numeracion: {
      type: Number,
      required: true
    },
    NombreCompleto: {
      type: String,
      required: true,
      trim: true,
    },
    MontoPagado: {
      type: Number,
      required: true,
    },
    Detalle: {
      type: String,
      required: true,
      trim: true,
    },
    FechaVenta: {
      type: Date,
      required: true,
    },
    Reservacion: {
      type: Boolean,
      required: true,
    },
    Restaurante: {
      type: String,
      required: true,
    },
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
