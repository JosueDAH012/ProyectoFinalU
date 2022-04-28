const { Schema, model } = require("mongoose");

const marcaSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: String,
      required: true,
    },
    Nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true,
    },
    Nacionalidad: {
      type: String,
      required: [true, "Por favor ingresar la nacionalidad!"]
    },
    Descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    },
    CedulaJuridica: {
      type: String,
      required: [true, "Por favor ingresar la cedula juridica!"],
      unique: true
    },
    Empresa: {
      type: String,
      required: [true, "Por favor ingresar el nombre de la empresa!"],
      trim: true
    },
    DetalleEmpresa: {
      type: String,
      required: [true, "Por favor ingresar un detalle de la empresa!"],
      trim: true
    },
    NumeroTelefono: {
      type: String,
      required: [true, "Por favor ingresar un numero de telefono!"],
      unique: true
    },
    FotoMarca: {
      type: String,
      required: true,
    },
    FotoEmpresa: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("marca", marcaSchema);
