const mongoose = require('mongoose');
const Habitacion = require(__dirname + "/models/habitacion");
const Limpieza = require(__dirname + "/models/limpieza");
const Usuario = require(__dirname + "/models/usuario");

mongoose.connect('mongodb://127.0.0.1:27017/hotel');

const borrarDatos = async() => {

    console.log("Borrando colección de habitaciones");
    await mongoose.connection.collections['habitaciones'].drop();
    console.log("Borrando colección de limpiezas");
    await mongoose.connection.collections['limpiezas'].drop();
    console.log("Borrando colección de usuarios");
    await mongoose.connection.collections['usuarios'].drop();

}

// Cargar datos de inicio
const cargarDatos = async() => {
    
    let habitaciones = [
        new Habitacion({
            _id: "1a1a1a1a1a1a1a1a1a1a1a1a",
            numero: 1,
            tipo: "doble",
            descripcion: "Habitación doble, cama XL, terraza con vistas al mar",
            ultimaLimpieza: new Date("2023-09-20T11:24:00Z"),
            precio: 59.90,
            incidencias: [
                {_id: "10011a1a1a1a1a1a1a1a1a1a",
                 descripcion: "No funciona el aire acondicionado",
                 inicio: new Date("2023-09-19T18:12:54Z")},
                {_id: "10021a1a1a1a1a1a1a1a1a1a",
                 descripcion: "No funciona el interruptor del aseo",
                 inicio: new Date("2023-09-20T10:15:06Z")}
            ]
        }),
        new Habitacion({
            _id: "2b2b2b2b2b2b2b2b2b2b2b2b",
            numero: 2,
            tipo: "familiar",
            descripcion: "Habitación familiar, cama XL y literas, aseo con bañera",
            ultimaLimpieza: new Date("2023-08-02T10:35:15Z"),
            precio: 65.45
        }),
        new Habitacion({
            _id: "3c3c3c3c3c3c3c3c3c3c3c3c",
            numero: 3,
            tipo: "familiar",
            descripcion: "Habitación familiar, cama XL y sofá cama, cocina con nevera",
            precio: 69.15
        }),
        new Habitacion({
            _id: "4d4d4d4d4d4d4d4d4d4d4d4d",
            numero: 4,
            tipo: "suite",
            descripcion: "Habitación con dos camas XL, terraza y vistas al mar",
            ultimaLimpieza: new Date("2023-10-10T12:05:10Z"),
            precio: 110.20,
            incidencias: [
                {_id: "10014d4d4d4d4d4d4d4d4d4d",
                 descripcion: "No funciona el jacuzzi",
                 inicio: new Date("2023-10-08T19:24:43Z")}
            ]
        }),
        new Habitacion({
            _id: "5e5e5e5e5e5e5e5e5e5e5e5e",
            numero: 5,
            tipo: "individual",
            descripcion: "Habitación simple, cama 150",
            precio: 34.65
        })
    ];
    
    let limpiezas = [
        new Limpieza({
            _id: "20011a1a1a1a1a1a1a1a1a1a",
            habitacion: "1a1a1a1a1a1a1a1a1a1a1a1a",
            fecha: new Date("2023-09-18T10:59:12Z"),
            observaciones: "Dejan toallas para cambiar"
        }),
        new Limpieza({
            _id: "20021a1a1a1a1a1a1a1a1a1a",        
            habitacion: "1a1a1a1a1a1a1a1a1a1a1a1a",
            fecha: new Date("2023-09-20T11:24:00Z")
        }),
        new Limpieza({
            _id: "20012b2b2b2b2b2b2b2b2b2b",
            habitacion: "2b2b2b2b2b2b2b2b2b2b2b2b",
            fecha: new Date("2023-08-02T10:35:15Z"),
            observaciones: "Desperfectos en puerta del aseo"
        }),
        new Limpieza({
            _id: "20013c3c3c3c3c3c3c3c3c3c",
            habitacion: "3c3c3c3c3c3c3c3c3c3c3c3c"
        }),
        new Limpieza({
            _id: "20014d4d4d4d4d4d4d4d4d4d",
            habitacion: "4d4d4d4d4d4d4d4d4d4d4d4d",
            fecha: new Date("2023-10-09T11:00:25Z")
        }),
        new Limpieza({
            _id: "20024d4d4d4d4d4d4d4d4d4d",
            habitacion: "4d4d4d4d4d4d4d4d4d4d4d4d",
            fecha: new Date("2023-10-10T12:05:10Z")
        }),
        new Limpieza({
            _id: "20015e5e5e5e5e5e5e5e5e5e",
            habitacion: "5e5e5e5e5e5e5e5e5e5e5e5e"
        }),
    ]
    
    let usuarios = [
        new Usuario({login:"usuario1", password: "password1"}),
        new Usuario({login:"admin", password:"12345678"})
    ];
    
    for(let i = 0; i < habitaciones.length; i++)
        await habitaciones[i].save();
    for(let i = 0; i < limpiezas.length; i++)
        await limpiezas[i].save();
    for(let i = 0; i < usuarios.length; i++)
        await usuarios[i].save();
}

// Función principal de ejecución de restauración de BD
const ejecutarRestauracion = async() => {

    console.log("Borrando datos...");
    await borrarDatos();
    console.log("Cargando datos...");
    await cargarDatos();
    mongoose.disconnect();
}

ejecutarRestauracion();
