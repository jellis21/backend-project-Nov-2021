require("dotenv").config();
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

const app = express();

app.use(express.json());

// setup the template engine
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/heartbeat', (req, res) => {
  res.render('hello world');
})

app.get('/', (req, res) => {
  res.render('landing');
})

app.listen('8080', () => {
  console.log('server is up and running!')
})
