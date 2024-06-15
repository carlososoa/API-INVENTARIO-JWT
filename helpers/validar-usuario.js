function esCorreoElectronicoValido(correo) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo);
}
const validarUsuario = (req) => {
    const validaciones = [];

    if (!req.body.nombre) {
        validaciones.push('nombre es requerido');
    }

    if (!req.body.email) {
        validaciones.push('email es requerido');
    }
    if (!esCorreoElectronicoValido(req.body.email)) {
        validaciones.push('el campo email debe ser un correo electronico');

    }

    if (!req.body.estado) {
        validaciones.push('Estado es requerido');
    }
    if (!(req.body.estado.trim().toLowerCase() === "activo" || req.body.estado.trim().toLowerCase() === "inactivo")) {
        validaciones.push('El campo estado debe ser activo o inactivo')
    }
    if (!req.body.password) {
        validaciones.push('Contraseña es requerida');
    }
    if (req.body.password.length < 8) {
        validaciones.push('La contraseña es muy corta');
    }
    if (!req.body.rol) {
        validaciones.push('Rol es requerido');
    }

    if (!(req.body.rol.trim().toLowerCase() === "administrador" || req.body.rol.trim().toLowerCase() === "docente")) {
        validaciones.push('El campo rol debe ser administrador o docente')
    }

    return validaciones;
}

module.exports = {
    validarUsuario,
}