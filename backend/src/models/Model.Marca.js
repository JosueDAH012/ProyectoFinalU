const { Schema, model } = require("mongoose");

const marcaSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'M'
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
     default: "https://res.cloudinary.com/mowglirealg/image/upload/v1651184032/marca/2923860021639131342-128_avptts.png"
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("marca", marcaSchema);
