const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');

const Livro = require ('./models/livro');
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://New-Berna:35eNKvmM4FhYx7qe@cluster0.cgmvz.mongodb.net/?retryWrites=true&w=majority', {dbName: "app-mean"})
.then(() => {
  console.log ("Conexão OK")
}).catch(() => {
  console.log("Conexão NOK")
});

app.use (bodyParser.json());

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post ('/api/livros', (req, res, next) => {
  const livro = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    numero_paginas: req.body.numero_paginas,
  })
  livro.save();
  console.log(livro);
  res.status(201).json({mensagem: "Livro cadastrado com sucesso!"});
});

app.get('/api/livros', (req, res, next) => {
  Livro.find().then(documents => {
    res.status(200).json({"mensagem": "Tudo certo!", "livros": documents})
  })
});

module.exports = app;
