const express = require('express');

let router = express.Router();
let Usuario = require(__dirname + "/../models/usuario");

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let existeUsuario;
    Usuario.find({login: login, password: password}).then((resultado) =>{
        existeUsuario = resultado;
        if (existeUsuario.length > 0) {
            req.session.usuario = existeUsuario;
            res.redirect('/habitaciones');
        } else {
            res.render('login', {error: "Usuario o contraseña incorrectos"});
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/habitaciones');
});

module.exports = router;