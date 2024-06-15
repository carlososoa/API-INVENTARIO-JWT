const { Schema, model } = require('mongoose');

// Define el esquema de usuario
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true, // Asegura que el nombre de usuario sea único
        trim: true, // Elimina espacios en blanco al inicio y final
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que el correo electrónico sea único
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido'], // Validación básica de email
        trim: true, // Elimina espacios en blanco al inicio y final
        lowercase: true, // Convierte el email a minúsculas
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Asegura que la contraseña tenga al menos 8 caracteres
    },
    estado: {
        type: String,
        required: true,
        enum: ['activo', 'inactivo'], // Estado solo puede ser 'activo' o 'inactivo'
    },
    rol: {
        type: String,
        required: true,
        enum: ['administrador', 'docente'], // Estado solo puede ser 'administrador' o 'docente'
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now, // Establece la fecha de creación como la fecha actual por defecto
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now, // Establece la fecha de actualización como la fecha actual por defecto
    }
});

// Middleware para actualizar la fecha de actualización antes de guardar
UsuarioSchema.pre('save', function (next) {
    this.fechaActualizacion = Date.now();
    next();
});

// Exporta el modelo de usuario
module.exports = model('Usuario', UsuarioSchema);
