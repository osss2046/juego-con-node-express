const express = require('express');
const app = express();
const PORT = 3000;

// Array de nombres
const usuarios = ['Alice', 'Bob', 'Oscar', 'David'];

// Middleware para servir los archivos estáticos desde la carpeta 'assets'
app.use(express.static('assets'));

// Ruta que devuelve el JSON con los nombres
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// Middleware para verificar si el usuario existe en el arreglo
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const { usuario } = req.params;
    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.status(404).sendFile(__dirname + '/assets/who.jpeg');
    }
});

// Esta ruta se debería definir después de middleware de usuario para una correcta función
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.send("Usuario verificado con éxito.");
});

// Ruta para el juego del conejo
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    const numeroElegido = parseInt(req.params.n);

    if (numeroAleatorio === numeroElegido) {
        res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

// Manejo de rutas no definidas
app.get('*', (req, res) => {
    res.status(404).send('Esta página no existe...');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
