const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};

  data.primerapellido = !isEmpty(data.primerapellido) ? data.primerapellido : "";
  data.segundoapellido = !isEmpty(data.segundoapellido) ? data.segundoapellido : "";
  data.numerotelefono = !isEmpty(data.numerotelefono) ? data.numerotelefono : "";
  data.celular = !isEmpty(data.celular) ? data.celular : "";

  if (validator.isEmpty(data.primerapellido)) {
    errors.primerapellido = "Required Primer Apellido";
  }
 
  if (validator.isEmpty(data.segundoapellido)) {
    errors.segundoapellido = "Required Segundo Apellido";
  }
  if (validator.isEmpty(data.numerotelefono)) {
    errors.numerotelefono = "Required Numero Telefono";
  }
  
  if (validator.isEmpty(data.celular)) {
    errors.celular = "Required celular";
  }
  


  return {
      errors,
      isValid: isEmpty(errors)
  }
};
