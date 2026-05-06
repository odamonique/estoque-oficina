const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

// Configurações básicas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão para login
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false
}));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota teste
app.get('/', (req, res) => {
  res.render('index');
});

// Servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});