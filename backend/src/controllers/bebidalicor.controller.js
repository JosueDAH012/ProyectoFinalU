require("dotenv").config();
const bebiLicorCtrl = {};

const BebiLicor = require('../models/Model.BebidaLicor');

const aes256 = require("aes256");
const key = process.env.KEY;
const cipher = aes256.createCipher(key);

//crear usuario
bebiGaseCtrl.createBebiGaseCtrl = async (req, res) => {
    //res.send("crear usuario"); //Prueba de api
    const nombre = cipher.encrypt(JSON.stringify(req.body.name));
    const age = cipher.encrypt(JSON.stringify(req.body.age));
    const email = cipher.encrypt(JSON.stringify(req.body.email));
    //console.log(nombre, age, email);
    const bebigs =  new BebiGase({
      name: nombre,
      age: age,
      email: email,
    });
    await bebigs.save(function (error, bebigs) {
      if (error) {
        return res.status(500).json({
          message: error,
        });
      }
      return res.json(bebigs);
      //res.json({message: 'Usuario creado'})
    });
  };

module.exports = bebiLicorCtrl;