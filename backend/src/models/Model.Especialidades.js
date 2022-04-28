const { Schema, model } = require("mongoose");

const especialidadesSchema = new Schema(
  {
    Consecutivo: {
      type: Schema.Types.ObjectId,
      ref: "consecutivo",
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    Nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre!"],
      trim: true,
    },
    Ingredientes: {
      type: String,
      required: [true, "Por favor ingrese los ingredientes!"],
      trim: true,
    },
    Precio: {
      type: String,
      required: true,
    },
    Detalle: {
      type: String,
      required: true,
      trim: true,
    },
    Foto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("especialidades", especialidadesSchema);
