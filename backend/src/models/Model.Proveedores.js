const { Schema, model } = require("mongoose");

const proveedoresSchema = new Schema(
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
      trim: true
    },
    PrimerApellido: {
      type: String,
      required: true,
      trim: true
    },
    SegundoApellido: {
      type: String,
      required: true,
      trim: true
    },
    CorreoElectronico: {
      type: String,
      required: true,
      trim: true
    },
    TelefonoOficina: {
      type: String,
      required: true
    },
    Fax: {
      type: String,
      required: true
    },
    Celular: {
      type: String,
      required: true
    },
    Cedula: {
      type: String,
      required: true
    },
    FechaIngreso: {
      type: String,
      required: true
    },
    Direccion: {
      type: String,
      required: true,
      trim: true
    },
    ProdcutosManejados: {
      type: String,
      required: true,
      trim: true
    },
    NombreContacto: {
      type: String,
      required: true,
      trim: true
    },
    TelefonoContacto: {
      type: String,
      required: true
    },
    DireccionContacto: {
      type: String,
      required: true,
      trim: true
    },
    Foto: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("proveedores", proveedoresSchema);
