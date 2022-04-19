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
      required: true,
      trim: true,
    },
    Nacionalidad: {
      type: String,
      required: true,
    },
    Descripcion: {
      type: String,
      required: true,
      trim: true
    },
    CedulaJuridica: {
      type: String,
      required: true,
      unique: true
    },
    Empresa: {
      type: String,
      required: true,
      trim: true
    },
    DetalleEmpresa: {
      type: String,
      required: true,
      trim: true
    },
    NumeroTelefono: {
      type: String,
      required: true,
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
