const { Schema, model } = require("mongoose");

const especialidadesSchema = new Schema(
  {
    consecutivo: {
      type: Schema.Types.ObjectId,
      ref: "consecutivo",
      required: true,
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre!"],
      trim: true,
    },
    ingredientes: {
      type: String,
      required: [true, "Por favor ingrese los ingredientes!"],
      trim: true,
    },
    precio: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
      trim: true,
    },
    foto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("especialidades", especialidadesSchema);
