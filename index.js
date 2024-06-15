const express = require('express')
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT; //creamos un puerto el cual es el 4000


//implementamo cors, a través del middleware
app.use(cors());


getConnection();

//Parseo JSON
app.use(express.json());

app.use('/login', require('./router/login'))
app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/inventario', require('./router/inventario'));


app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
});