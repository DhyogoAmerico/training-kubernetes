const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dataPath = path.join('/app/data', 'counter.txt');
const message = process.env.WELCOME_MESSAGE || "Olá! Esta página foi visitada";

// Endpoint de health check para as Probes
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    let count = 0;
    try {
        if (fs.existsSync(dataPath)) {
            count = parseInt(fs.readFileSync(dataPath, 'utf8'));
        }
    } catch (err) {
        console.error("Erro ao ler o contador:", err);
    }
    count++;
    try {
        // Cria o diretório se ele não existir
        fs.mkdirSync(path.dirname(dataPath), { recursive: true });
        fs.writeFileSync(dataPath, count.toString());
    } catch (err) {
        console.error("Erro ao salvar o contador:", err);
        return res.status(500).send('Erro ao salvar o contador.');
    }
    res.send(`${message} ${count} vezes.`);
});

app.listen(3000, () => console.log('App ouvindo na porta 3000.'));