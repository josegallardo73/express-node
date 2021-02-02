"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
const PORT = 8080;
let productos = fs_1.default.readFileSync('productos.txt', 'utf-8');
productos = JSON.parse(productos.split('\n').join(''));
const randomData = (max, min) => Math.round(Math.random() * (max - min) + min);
const items = {
    items: productos,
    cantidad: productos.length
};
const visitas = {
    visitas: {
        items: 0,
        item: 0,
    }
};
app.get('/items', (req, res) => {
    visitas.visitas.items += 1;
    if (res.status(200).send(items))
        console.log('Petición realizada correctamente');
    else
        res.status(500).send('Algo salio mal');
});
app.get('/item-random', (req, res) => {
    visitas.visitas.item += 1;
    const producto = productos[randomData(0, productos.length - 1)];
    if (typeof producto === 'object' && res.status(200).send(producto)) {
        console.log('Peticion realizada correctamente');
    }
    else
        res.status(500).send('Algo salio mal');
});
app.get('/visitas', (req, res) => {
    if (res.status(200).send(visitas))
        console.log('Peticion realizada correctamente');
    else
        res.status(500).send('Algo salio mal');
});
const server = app.listen(PORT, () => {
    console.log('Servidor inicializado en puerto', PORT);
});
server.on("error", error => console.log('Error en servidor ${error}'));
