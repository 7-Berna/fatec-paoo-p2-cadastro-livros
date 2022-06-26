const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');

app.use (bodyParser.json());

const livros = [
  {
    id: 1,
    autor: 'Jamal',
    titulo: 'Valorant',
    numero_paginas: 40,
  },
  {
    id: 2,
    autor: 'Felipe',
    titulo: 'Odeio Ahri',
    numero_paginas: 50,
  }
]


app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post ('/api/livros', (req, res, next) => {
  const livros = req.body;
  console.log(livros);
  res.status(201).json({mensagem: "Livro cadastrado com sucesso!"});
});

app.get('/api/livros', (req, res, next) => {
  res.status(200).json({"mensagem": "Tudo certo!", "livros": livros})
});


module.exports = app;
