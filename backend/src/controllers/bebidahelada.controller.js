require("dotenv").config();
const bebiHelaCtrl = {};

const BebiHela = require('../models/Model.BebidaHelada');

const aes256 = require("aes256");
const key = process.env.KEY;
const cipher = aes256.createCipher(key);

//crear usuario
bebiHelaCtrl.createBebiHelaCtrl = async (req, res) => {
    //res.send("crear usuario"); //Prueba de api
    const nombre = cipher.encrypt(JSON.stringify(req.body.name));
    const age = cipher.encrypt(JSON.stringify(req.body.age));
    const email = cipher.encrypt(JSON.stringify(req.body.email));
    //console.log(nombre, age, email);
    const bebihe =  new BebiHela({
      name: nombre,
      age: age,
      email: email,
    });
    await bebihe.save(function (error, bebihe) {
      if (error) {
        return res.status(500).json({
          message: error,
        });
      }
      return res.json(bebihe);
      //res.json({message: 'Usuario creado'})
    });
  };

module.exports = bebiHelaCtrl;