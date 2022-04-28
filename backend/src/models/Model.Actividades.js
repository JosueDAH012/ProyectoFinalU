const { Schema, model } = require("mongoose");

const actividadesSchema = new Schema(
  {
    Actividades: {
        type: String,
        required: true
    }
},
{ timestamps: true, versionKey: false }
);

module.exports = model("actividades", actividadesSchema);