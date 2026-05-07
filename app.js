require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

require('./db/database');

const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sessão para login
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use('/', authRoutes);

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Rota teste
app.get('/', auth, (req, res) => {
  res.render('index');
});

//Servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});