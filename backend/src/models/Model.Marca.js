const { Schema, model } = require("mongoose");

const marcaSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    nacionalidad: {
      type: String,
      required: [true, "Por favor ingresar la nacionalidad!"]
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    },
    cedulajuridica: {
      type: String,
      required: [true, "Por favor ingresar la cedula juridica!"],
      unique: true
    },
    empresa: {
      type: String,
      required: [true, "Por favor ingresar el nombre de la empresa!"],
      trim: true
    },
    detalleempresa: {
      type: String,
      required: [true, "Por favor ingresar un detalle de la empresa!"],
      trim: true
    },
    numerotelefono: {
      type: String,
      required: [true, "Por favor ingresar un numero de telefono!"],
      unique: true
    },
    fotomarca: {
      type: String,
      required: true,
    },
    fotoempresa: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("marca", marcaSchema);
