const express = require('express'); //basicamente es importar express
const app = express();             //usamos el alias APP para referirnos a express
const PORT = 3000;                // es el puerto que usaremos

app.use(express.json());        //para leer json / Middleware


const fs = require('fs');      //importacion de FileSystem
const path = require('path'); //importacion de Path

const dataPath = path.join(__dirname, 'juegos.json')

//Get Generico para verificar la correcta inicializacion del servidor
app.get('/', (req, res) => {
    res.send('API funcionando bien');
});

//Mensaje desplegado en CMD al ejecutar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo (http://localhost:${PORT})`);
});

//GET para obtener TODOS los juegos
app.get('/juegos', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf8');
    const juegos = JSON.parse(data);
    res.json(juegos);
});

//GET para encontrar juego por ID
app.get('/juegos/:id', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf8');
    const juegos = JSON.parse(data);
    const id = parseInt(req.params.id);

    const juego = juegos.find(j => j.id === id);

    if(!juego){
        return res.status(404).send('Juego no Encontrado');
    };

    res.json(juego);
});

//POST generico para juegos
app.post('/juegos', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf8');
    const juegos = JSON.parse(data);

    const nuevoJuego = {
        id: juegos.length ? juegos[juegos.length - 1].id + 1 : 1,
        nombre: req.body.nombre,
        genero: req.body.genero,
        desarrollador: req.body.desarrollador,
        editor: req.body.editor,
        stock: req.body.stock,
        descripcion: req.body.descripcion,
        precio: req.body.precio
        
    };

    juegos.push(nuevoJuego);
    fs.writeFileSync(dataPath, JSON.stringify(juegos, null, 4), 'utf8');
    res.status(201).json(nuevoJuego);
});

//PUT para actualizar juego por ID
app.put('/juegos/:id', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf8');
    const juegos = JSON.parse(data);
    const id = parseInt(req.params.id);

    const juego = juegos.find(j => j.id === id);
    if(!juego){
        return res.status(404).send('Juego no Encontrado');
    };

    juego.nombre = req.body.nombre               || juego.nombre;
    juego.genero = req.body.genero               || juego.genero;
    juego.desarrollador = req.body.desarrollador || juego.desarrollador;
    juego.editor = req.body.editor               || juego.editor;
    juego.stock = req.body.stock                 || juego.stock;
    juego.descripcion = req.body.descripcion     || juego.descripcion;
    juego.precio = req.body.precio               || juego.precio;

    fs.writeFileSync(dataPath, JSON.stringify(juegos, null, 4), 'utf8');
    res.json(juego);
});

//PATCH para actualizar CAMPO de juego por ID
app.patch('/juegos/:id', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf8');
    const juegos = JSON.parse(data);
    const id = parseInt(req.params.id);

    const juego = juegos.find(j => j.id === id);
    if(!juego){
        return res.status(404).send('Juego no Encontrado');
    };
    
    if(req.body.nombre){
        juego.nombre = req.body.nombre;
    };
    if(req.body.genero){
        juego.genero = req.body.genero;
    };
    if(req.body.desarrollador){
        juego.desarrollador = req.body.desarrollador;
    };
    if(req.body.editor){
        juego.editor = req.body.editor;
    };
    if(req.body.stock){
        juego.stock = req.body.stock;
    };
    if(req.body.descripcion){
        juego.descripcion = req.body.descripcion;
    };
    if(req.body.precio){
        juego.precio = req.body.precio;
    };

    fs.writeFileSync(dataPath, JSON.stringify(juegos, null, 4), 'utf8');
    res.json(juego);
});

app.delete('/juegos/:id', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf8');
    let juegos = JSON.parse(data);
    const id = parseInt(req.params.id);

    const juego = juegos.find(j => j.id === id);

    if(!juego){
        return res.status(404).send('Juego no existe!');
    };

    juegos = juegos.filter(j => j.id !== id);

    fs.writeFileSync(dataPath, JSON.stringify(juegos, null, 4));
    res.send('Juego Eliminado');
});