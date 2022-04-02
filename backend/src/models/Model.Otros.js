const { Schema, model } = require("mongoose");

const otrosSchema = new Schema(
  {
    TipoBuffet: {
      type: String,
    },
    TipoFacturacion: {
      type: String,
    },
    ClaseComestible: {
      type: String,
    },
    LineaComestible: {
      type: String,
    },
    TipoComestible: {
      type: String,
    }
  },
  { timestamps: true, versionKey: false }
);


/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de buffet.
 *
 *  Marina
 *  Vegetal
 *  Fruta
 *  Mediterraneo.
 */

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de facturacion.
 *
 *  AperturaCaja
 *  CierreCaja
 *  PagoCliente
 */

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de Tipo de Comestible.
 *
 *  Frutas
 *  Cacao
 *  Carnes
 *  Aceites
 *  Cereales
 *  Vegetales
 *  Legumbres
 *  Frutos Secos
 */

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de Clase de Comestible.
 *
 *  Fibra
 *  Grasas
 *  Proteínas
 *  Vitaminas
 *  Minerales
 *  Carbohidratos
 */

/*
 * Posibles datos de la variable Tipo para
 * categorizar los tipos de Línea de Comestible.
 *
 *  Secos
 *  Congelados
 *  Refrigerados
 */



module.exports = model("otros", otrosSchema);
