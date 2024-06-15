const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;


mongoose.set('strictQuery', true);

const getConnection = async () => {

    try {
        const url = MONGO_URI;

        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}