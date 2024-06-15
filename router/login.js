const { Router } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()

const { validarUsuarioLogin } = require('../helpers/validar-usuario-login');

const router = Router();
const secreto = process.env.SECRET_JWT_KEY;


router.post('/', async function (req, res) {

  try {
    const validaciones = validarUsuarioLogin(req);

    if (validaciones.length > 0) { //validaciones.length > 0)
      return res.status(400).send(validaciones);
    }


    const usuario = await Usuario.findOne({ email: req.body.email })

    if (!usuario) {
      console.log("no existe el email");
      return res.status(400).send("El email ingresado no se encuentra registrado");
    } else {
      // const usuario = await Usuario.findOne({ email: req.body.email })
      const isValid = bcrypt.compareSync(req.body.password, usuario.password)

      const payload = { id: usuario._id, email: usuario.email, rol: usuario.rol }

      if (isValid) {
        const token = jwt.sign(payload, secreto,
          {
            expiresIn: '1h'

          });

        res.send({ mensaje: "usuario valido", payload, token })

      } else {
        res.send("contraseña incorrecta")
      }

    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrrio un error al crear usuario');
  }

});




module.exports = router;