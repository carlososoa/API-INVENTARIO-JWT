const jwt = require('jsonwebtoken');

const validarRolAdmin = (req, res, next) => {
  if (req.payload.rol != 'administrador') {
    return res.status(401).json({ mensaje: 'Error, usuario no autorizado' });
  } next();
}

module.exports = {
  validarRolAdmin
}