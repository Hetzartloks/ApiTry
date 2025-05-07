const express = require('express');
const path = require('path');

//importacion de rutas
const categoriesRoutes = require('./routes/categories');

//inicializacion de Express
const app = express();

//configuracion
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/categories', categoriesRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando'})
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http:/localhost:${PORT}`);
});