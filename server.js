const path = require("path");
// Importa o express framework e o body-parser para lidar com requisições HTTP
const express = require("express");
const bodyParser = require("body-parser");

// Inicia o servidor express e configura o body-parser para lidar com JSON
const app = express();
app.use(bodyParser.json());

// Lista de filmes (simulando um banco de dados)
let filmes = [];

// utiliza a expressão get do framework express para definir a rota raiz do servidor
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// utiliza a expressão post do framework express para definir a rota /filmes e adicionar um filme à lista
app.post("/filmes", (req, res) => {
  const filme = req.body;
  filmes.push(filme);
  res.send({ message: "Filme adicionado com sucesso!" });
});

// utiliza o get para retornar a lista de filmes
app.get("/filmes", (req, res) => {
  res.send(filmes);
});

// inicia o servidor na porta 5000
app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
