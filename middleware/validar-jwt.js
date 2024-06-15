const jwt = require('jsonwebtoken');
require('dotenv').config()

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Error, usuario no autorizado' })
  }

  try {

    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.payload = payload;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ mensaje: 'Error, usuario no autorizado' })
  }

}

module.exports = {
  validarJWT
}