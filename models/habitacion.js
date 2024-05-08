/* Esquema de las incidencias registradas en las habitaciones */

const mongoose = require("mongoose");

let incidenciaSchema = new mongoose.Schema({
    /* descripción de la incidencia: no funciona el aire acondicinado, etc */
    descripcion: {
        type: String,
        trim: true, 
        required: [true, "La descripción es obligatoria"]
    },
    /* fecha en la que se registra la incidencia */     
    inicio: {
        type: Date,
        required: [true, "La fecha de inicio es obligatoria"],
        default: Date.now
    }, 
    /* fecha en la que se resuelve la incidencia */
    fin: {
        type: Date, 
        required: false
    },
    imagen: {
        type: String,
        required: false
    }
});

/* Esquema y modelo que representa cada habitación del hotel.*/

let habitacionSchema = new mongoose.Schema({
    /* número de habitación */
    numero: {
        type: Number,
        required: [true, "El número de la habitación es obligatorio"],
        min: [1, "Mínimo un carácter de longitud"],
        max: [50, "Máximo 50 caracteres de longitud"]         
    },
    /* tipo de habitación */
    tipo: {
        type: String,
        required: [true, "El tipo de la habitación es obligatorio"],
        enum: {
            values: ["individual", "doble", "familiar", "suite"],
            message: "El tipo de la habitación solo puede ser: individual, doble, familiar, suite",
        }
    },        
    /* descripción de la habitación: número de camas, tipo de cama, si tiene terraza, si tiene vistas, televisor, etc */
    descripcion: {
        type: String,
        required: [true, "La descripción de la habitación es obligatoria"],
        trim: true
    }, 
    /* fecha de la última limpieza */
    ultimaLimpieza: {
        type: Date,
        required: [true, "La fecha de la última limpieza es obligatoria"],
        default: Date.now
    },    
    /* precio de la habitación por noche */
    precio: {
        type: Number,
        required: [true, "El precio de la habitación es obligatorio"],
        min: [0, "El mínimo es 0"],
        max: [300, "El máximo es 300"]
    },
    /* Array de incidencias producidas en la habitación */
    incidencias: [incidenciaSchema],
    imagen: {
        type: String,
        required: false
    }
});

let Habitacion = mongoose.model('habitaciones', habitacionSchema);

module.exports = Habitacion;