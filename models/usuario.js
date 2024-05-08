/* Esquema y modelo acerca de los usuarios autorizados */

const mongoose = require("mongoose");

let usuarioSchema = new mongoose.Schema ({

    /* login */
    login: {
            type: String,
            required: [true, "El login es obligatorio"],
            trim: true,
            minlength: [5, "La longitud es como mínimo de 5 caracteres"]
    },
    /* password */
    password: {
        type: String,
        required: [true, "El password es obligatorio"],
        minlength: [8, "La longitud del password es como mínimo de 8 caracteres"]
    }
});

let Usuario = mongoose.model('usuarios', usuarioSchema);

module.exports = Usuario;