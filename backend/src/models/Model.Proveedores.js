const { Schema, model } = require("mongoose");

const proveedoresSchema = new Schema(
  {
    Consecutivo: {
      type: String,
      required: true,
    },
    Numeracion: {
      type: Number,
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
      type: Number,
      required: true
    },
    Fax: {
      type: Number,
      required: true
    },
    Celular: {
      type: Number,
      required: true
    },
    Cedula: {
      type: Number,
      required: true
    },
    FechaIngreso: {
      type: Date,
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
      type: Number,
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
