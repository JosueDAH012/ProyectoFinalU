const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const productosequiposSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'EU'
    },
    numeracion: {
      type: Number,
      required: true
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    },
    marca: {
      type: String,
      required: [true, "Por favor ingresar una marca!"]
    },
    cantidad: {
      type: String,
      required: [true, "Por favor ingresar una cantidad!"]
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);
productosequiposSchema.plugin(AutoIncrement, {inc_field: 'numeracion'});

module.exports = model("productosequipos", productosequiposSchema);

