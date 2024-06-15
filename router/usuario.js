const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validar-usuario');
const bcrypt = require('bcrypt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin')
const { validarJWT } = require('../middleware/validar-jwt')

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], async function (req, res) {

    try {
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado.trim().toLowerCase();
        hashedPassword = bcrypt.hashSync(req.body.password, 10);
        usuario.password = hashedPassword;
        usuario.rol = req.body.rol.trim().toLowerCase();
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrrio un error al crear usuario');
    }

});

router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {

    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }

});

router.put('/:usuarioId', [validarJWT, validarRolAdmin], async function (req, res) {

    try {
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(400).send('usuario no existe');
        }

        const existeUsuario = await Usuario.
            findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado.trim().toLowerCase();
        hashedPassword = bcrypt.hashSync(req.body.password, 10);
        usuario.password = hashedPassword;
        usuario.rol = req.body.rol.trim().toLowerCase();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrrio un error al actualizar el usuario');
    }

});

module.exports = router;