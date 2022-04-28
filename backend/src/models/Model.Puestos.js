const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const puestosSchema = new Schema(
  {
    _id: Number,
    consecutivo: {
      type: String,
      required: true,
      default: 'PU'
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"],
      trim: true
    },
    posicionrestaurante: {
      type: String,
      required: [true, "Por favor ingresar una posicion en el restuarante!"]
    },
    rol: {
      type: String,
      required: [true, "Por favor ingresar un puesto!"]
    }
  },
  { timestamps: true, versionKey: false }
);
puestosSchema.plugin(AutoIncrement);


module.exports = model("puestos", puestosSchema);
