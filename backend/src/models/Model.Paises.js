const { Schema, model, mongoose } = require("mongoose");
require("dotenv").config();
const AutoIncrementFactory = require('mongoose-sequence');

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const AutoIncrement = AutoIncrementFactory(connection);

const paisesSchema = new Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      default: 'P'
    },
    numeracion: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingresar un nombre!"]
    },
    fotobandera: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);
paisesSchema.plugin(AutoIncrement, {inc_field: 'numeracion'});

module.exports = model("paises", paisesSchema);
