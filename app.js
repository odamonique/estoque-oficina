require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

require('./db/database');

const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const fornecedorRoutes = require('./routes/fornecedores');
const homeRoutes = require('./routes/home');

const app = express();

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Sessão para login
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//Rotas 
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/fornecedores', fornecedorRoutes);

//Servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});