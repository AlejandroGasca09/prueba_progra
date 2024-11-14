const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();

//configuracion para el uso peticiones post
app.use(bodyParser.urlencoded({ extended: false }));


//platillas que sean dinamicas
app.set('view engine', 'ejs');

//crear la conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'xdxd', 
    database: 'prueba_proyecto',
    port: 3306
});


//comprobacion de la conexion de la base de datos
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

//iniciamos el server

//const hostname= '192.168.3.115';
const port = 3006;
app.listen(port,()=>{
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});

//index

app.get('/', (req, res) => {
    const query = 'SELECT * FROM proyecto_progra';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.send('Error');
        } else {
            res.render('index', { users: results });
        }
    });
});


//agregar usuarios

app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO proyecto_progra (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err) => {
        if (err) {
            console.error('Error adding user:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});




//editar usuario
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM proyecto_progra WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.send('Error');
        } else {
            res.render('edit', { user: results[0] });
        }
    });
});

//eliminar usuario

app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM proyecto_progra WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});