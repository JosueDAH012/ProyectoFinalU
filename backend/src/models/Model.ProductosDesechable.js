const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const pdSchema = new Schema(
  {
    _id: Number,
    consecutivo: {
      type: String,
      required: true,
      default: 'DE'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingresar una descripcion!"],
      trim: true
    },
    cantidad: {
      type: String,
      required: [true, "Por favor ingresar una cantidad!"]
    },
    restaurante: {
      type: String,
      required: [true, "Por favor ingresar un restaurante!"]
    },
    marca: {
      type: String,
      required: [true, "Por favor ingresar una marca!"]
    }
  },
  { timestamps: true, versionKey: false }
);
pdSchema.plugin(AutoIncrement);

module.exports = model("productosdesechables", pdSchema);
