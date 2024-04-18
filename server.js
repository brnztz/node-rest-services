// O express está sendo utilizado para criar um servidor HTTP que irá servir a aplicação.
// O body-parser é um middleware que irá fazer o parse do corpo da requisição para JSON.
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Inicializa o express e configura o body-parser.
const app = express();
app.use(bodyParser.json());

// Cria uma variável para armazenar os filmes.
let filmes = [];

// Configura as rotas da aplicação.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Cria uma rota para adicionar um filme.
app.post("/filmes", (req, res) => {
  const filme = req.body;
  filme.id = Date.now().toString();
  filmes.push(filme);
  res.send({ message: "Filme adicionado com sucesso!" });
});

// Cria uma rota para listar os filmes.
app.get("/filmes", (req, res) => {
  res.send(filmes);
});

// Cria uma rota para buscar um filme pelo id e fazer a exclusão.
app.delete("/filmes/:id", (req, res) => {
  const id = req.params.id;
  filmes = filmes.filter(filme => filme.id !== id);
  res.send({ message: "Filme excluído com sucesso!" });
});

// Cria uma rota para buscar um filme pelo id e fazer a atualização.
app.put("/filmes/:id", (req, res) => {
  const id = req.params.id;
  const novoFilme = req.body;
  filmes = filmes.map(filme => {
    if (filme.id === id) {
      return {
        ...filme,
        ...novoFilme
      };
    }
    return filme;
  });
  res.send({ message: "Filme atualizado com sucesso!" });
});

// Inicia o servidor na porta 5000.
app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
