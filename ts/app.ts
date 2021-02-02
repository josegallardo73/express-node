import { application } from "express";
import fs from "fs";
import express, {Application, Request, Response} from 'express';

const app = express();
app.use(express.json());

const PORT = 8080;
let productos = fs.readFileSync('productos.txt', 'utf-8');
productos = JSON.parse(productos.split('\n').join(''));

const randomData = (max:number, min:number):number => Math.round(Math.random() * (max - min) + min);

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


app.get('/items', (req:Request, res:Response) => {
    visitas.visitas.items += 1;
    if(res.status(200).send(items)) console.log('Petición realizada correctamente');
    else res.status(500).send('Algo salio mal');
});

app.get('/item-random', (req:Request, res:Response) => {
    visitas.visitas.item +=1;
    const producto = productos[randomData(0, productos.length - 1)];
    if(typeof producto === 'object' && res.status(200).send(producto)) {
        console.log('Peticion realizada correctamente');
    } else res.status(500).send('Algo salio mal');
    
    }
);

app.get('/visitas', (req:Request, res:Response) => {
    if(res.status(200).send(visitas)) console.log('Peticion realizada correctamente');
    else res.status(500).send('Algo salio mal');
})




const server = app.listen(PORT, ()=> {
    console.log('Servidor inicializado en puerto', PORT);
})
server.on("error", error => console.log('Error en servidor ${error}'));
