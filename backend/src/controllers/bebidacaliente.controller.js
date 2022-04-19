require("dotenv").config();
const bebiCaleCtrl = {};

const BebiCale = require('../models/Model.BebidaCaliente');

const aes256 = require("aes256");
const key = process.env.KEY;
const cipher = aes256.createCipher(key);

//crear usuario
bebiCaleCtrl.createBebiCaleCtrl = async (req, res) => {
    //res.send("crear usuario"); //Prueba de api
    const nombre = cipher.encrypt(JSON.stringify(req.body.name));
    const age = cipher.encrypt(JSON.stringify(req.body.age));
    const email = cipher.encrypt(JSON.stringify(req.body.email));
    //console.log(nombre, age, email);
    const bebicl =  new BebiCale({
      name: nombre,
      age: age,
      email: email,
    });
    await bebicl.save(function (error, bebicl) {
      if (error) {
        return res.status(500).json({
          message: error,
        });
      }
      return res.json(bebicl);
      //res.json({message: 'Usuario creado'})
    });
  };

module.exports = bebiCaleCtrl;