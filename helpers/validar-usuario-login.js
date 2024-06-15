
const Usuario = require('../models/Usuario');



function esCorreoElectronicoValido(correo) {
  const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return patron.test(correo);
}

const validarUsuarioLogin = (req) => {
  const validaciones = [];

  if (!req.body.email) {
    validaciones.push('email es requerido');
  }

  if (!esCorreoElectronicoValido(req.body.email)) {
    validaciones.push('el campo email debe ser un correo electronico');

  }

  if (!req.body.password) {
    validaciones.push('Contraseña es requerida');
  }
  if (req.body.password.length < 8) {
    validaciones.push('La contraseña es muy corta');
  }



  return validaciones;
}

module.exports = {
  validarUsuarioLogin,
}