const express = require('express');
const { Worker } = require('worker_threads');
const port = 4000;
const app = express();
app.get('/non-blocking', (req, res) => {
    res.status(200).send('This page is non-blocking');
});
app.get('/blocking', (req, res) => {
    const worker = new Worker('./src/worker.js');
    worker.on('message', (data) => {
        res.status(200).send(`Result is ${data}`);
    });
    worker.on('error', (error) => {
        res.status(404).send(`An error occured ${error}`);
    });
});
app.listen(port, () => console.log(`Server listen on http://localhost:${port}`));
