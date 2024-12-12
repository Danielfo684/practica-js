import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const cartasPosiciones = {
    lista: []
};


app.get('/', (req, res) => {
    res.json(cartasPosiciones);
});


app.post('/cards', (req, res) => {
    const newItem = req.body;
    console.log(req.body);
   console.log('Llegan los datos');
   cartasPosiciones.lista.push(newItem);
    res.sendStatus(200);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
