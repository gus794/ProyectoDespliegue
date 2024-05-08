/* Librerías */
const express = require("express");

let Limpieza = require(__dirname + "/../models/limpieza");
let Habitacion = require(__dirname + "/../models/habitacion");
const auth = require(__dirname + '/../utils/auth.js');

let router = express.Router();

router.get('/nueva/:id', auth.autenticacion ,(req, res) => {
  Habitacion.findById(req.params.id).then((resultado) =>{
    res.render('limpiezas_nueva', {fecha: Date.now(), habitacion: resultado});
  });
});

/* Listado de todas las limpiezas de una habitación */
router.get("/:id", (req, res) => {
  Habitacion.findById(req.params.id).then((resultadoHab) =>{
    Limpieza.find({habitacion: req.params.id}).sort('-fecha')
    .then((resultado) => {
      res.render('limpiezas_listado', { limpiezas: resultado, habitacion: resultadoHab});
    }).catch((err) => {
        res.render('error', { error: 'Error listando limpiezas' });
    });
  });
});

/* Añadir limpieza */
router.post("/:id", auth.autenticacion ,(req, res) => {
    let nuevaLimpieza = new Limpieza({
        habitacion: req.params.id,
        fecha: req.body.fecha
    });
    if(req.body.observaciones){
        nuevaLimpieza.observaciones = req.body.observaciones;
    }
    nuevaLimpieza.save().then(resultado => {
      res.redirect(req.baseUrl+"/"+req.params.id);
    }).catch(error => {
      res.render('error', {error: "Error al insertar una limpieza"});
    });
});

module.exports = router;