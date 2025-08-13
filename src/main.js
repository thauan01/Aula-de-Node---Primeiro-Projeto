const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    console.log("Entrei no GET");
    res.send("Oi, mundo! Estou no GET!");
});

app.post('/post', (req, res) => {
    console.log("Entrei no POST");
    res.send("Oi, mundo! Estou no POST!");
});

app.listen(PORT, () => {
    console.log("Olá, mundo!");
});

