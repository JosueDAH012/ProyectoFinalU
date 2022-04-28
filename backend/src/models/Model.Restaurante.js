const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const restauranteSchema = new Schema(
  {
    _id: Number,
    consecutivo: {
      type: String,
      required: true,
      default: 'RES'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre!"],
      trim: true
    },
    especialidad: {
      type: String,
      required: [true, "Por favor ingrese la especialidad!"]
    },
    direccion: {
      type: String,
      required: [true, "Por favor ingrese la direccion!"],
      trim: true
    },
    telefono: {
      type: String,
      required: [true, "Por favor ingrese el numero de telefono!"]
    },
    activo: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);
restauranteSchema.plugin(AutoIncrement);

module.exports = model("restaurante", restauranteSchema);
