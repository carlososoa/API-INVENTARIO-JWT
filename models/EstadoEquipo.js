const { Schema, model } = require('mongoose');

const EstadoEquipoSchema = Schema({
    nombre: { type: String, requited: true },
    estado: { type: String, requited: true, enum: [ 'Activo', 'Inactivo' ] },
    fechaCreacion: { type: Date, requited: true },
    fechaActualizacion: { type: Date, requited: true }
});

module.exports = model('EstadoEquipo', EstadoEquipoSchema);