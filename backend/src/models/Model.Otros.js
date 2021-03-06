const { Schema, model } = require("mongoose");

const otrosSchema = new Schema(
  {
    tipobuffet: {
      type: String,
    },
    tipofacturacion: {
      type: String,
    },
    clasecomestible: {
      type: String,
    },
    lineacomestible: {
      type: String,
    },
    tipocomestible: {
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
