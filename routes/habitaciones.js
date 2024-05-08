/* Librerías */
const express = require("express");

const upload = require(__dirname + '/../utils/uploads.js');
const auth = require(__dirname + '/../utils/auth.js');
let Habitacion = require(__dirname + "/../models/habitacion");
let Limpieza = require(__dirname + "/../models/limpieza");

let router = express.Router();

router.get('/nueva', auth.autenticacion ,(req, res) => {
  res.render('habitaciones_nueva');
});

router.post('/',upload.uploadHabitacion.single('imagen'), auth.autenticacion , (req, res) => {
  let nuevaHabitacion = new Habitacion({
      numero: req.body.numero,
      tipo: req.body.tipo,
      descripcion: req.body.descripcion,
      precio: req.body.precio
  });
  if(req.file){
    nuevaHabitacion.imagen = req.file.filename;
  }
  nuevaHabitacion.save().then(resultado => {
      res.redirect(req.baseUrl);
  }).catch(error => {
    let errores = {
      general: 'Error insertando habitación'
    };
    if(error.errors.numero)
    {
        errores.numero = error.errors.numero.message;
    }
    if(error.errors.tipo)
    {
        errores.tipo = error.errors.tipo.message;
    }
    if(error.errors.descripcion)
    {
        errores.descripcion = error.errors.descripcion.message;
    }
    if(error.errors.precio)
    {
        errores.precio = error.errors.precio.message;
    }

    res.render('habitaciones_nueva', {errores: errores, datos: req.body});
  });
});

/* Listado de todas las habitaciones */
router.get("/", (req, res) => {
    Habitacion.find()
    .then((resultado) => {
      if (!resultado || resultado.length == 0)
        throw new Error();
      else 
      res.render('habitaciones_listado', { habitaciones: resultado});
    }).catch((err) => {
      res.render('error', { error: 'Error listando habitaciones' });
    });
});

/* Ficha de una habitación */
router.get("/:id", (req, res) => {
  Habitacion.findById(req.params.id)
  .then((resultado) => {
    if (!resultado)
      throw new Error();
    else 
      res.render('habitaciones_ficha', { habitacion: resultado});
  }).catch((err) => {
      res.render('error', { error: 'Error obteniendo la ficha de una habitación' });
  });
});

/* Borrado de habitación */
router.delete("/:id", auth.autenticacion ,(req, res) => {
  Habitacion.findByIdAndRemove(req.params.id)
  .then(resultado => {
    if(resultado)
      res.redirect(req.baseUrl);
    else
      res.render('error', {error: "Habitación no encontrada"});
  }).catch(error => {
      res.render('error', {error: "Error eliminando la habitación"});
  });
});

/* Añadir incidencia */
router.post("/:id/incidencias",upload.uploadIncidencia.single('imagen'), auth.autenticacion ,(req, res) => {
  nuevaIncidencia(req, res);
});

/* Actualizar incidencia */
router.put("/:idHab/incidencias/:idInc", auth.autenticacion ,(req, res) => {
  actualizarIncidencia(req, res);
});

/* Función asíncrona auxiliar para los pasos de añadir nueva incidencia */
async function nuevaIncidencia(req, res)
{
  try
  {
    let habitacion = await Habitacion.findById(req.params.id);
    if(habitacion)
    {
      let incidencia = {
        descripcion: req.body.descripcion,
        inicio: Date.now()
      };
      if(req.file){
        incidencia.imagen = req.file.filename;
      }
      habitacion.incidencias.push(incidencia)
      await habitacion.save();
      res.redirect(req.baseUrl+"/"+req.params.id);
    }
    else
      res.render('error', {error: "No se ha encontrado la habitación con esa ID"});;    
  }
  catch(error)
  {
    res.render('error',{error: "Error añadiendo la incidencia"});
  }
}

/* Función asíncrona auxiliar para los pasos de actualizar fecha de incidencia */
async function actualizarIncidencia(req, res)
{
  try
  {
    let habitacion = await Habitacion.findById(req.params.idHab);
    if(habitacion)
    {
      let incidencia = habitacion.incidencias.filter(i => i._id == req.params.idInc);
      if (incidencia.length > 0)
      {
        incidencia[0].fin = Date.now();
        await habitacion.save();
        res.redirect(req.baseUrl+"/"+req.params.idHab);
      }
      else
      res.render('error',{error: "La incidencia no existe"});
    }
    else
    res.render('error',{error: "Habitación no encontrada"});
  }
  catch(error)
  {
    res.render('error',{error: "Incidencia no encontrada"});
  }
}

module.exports = router;