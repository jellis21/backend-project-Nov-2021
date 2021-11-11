const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const Sequelize = require('sequelize');
const { Flashcard } = require('./models');

const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/flashcards', express.static(__dirname + '/public'));
app.use(express.json());

// setup the template engine
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/heartbeat', (req, res) => {
  res.json({
    "is": "working"
  })
})

const {flashcards} = require('./routes');
app.use('/flashcards', flashcards);

app.get('/', (req, res) => {
  res.render('landing');
});

app.listen('8080', () => {
  console.log('server is up and running!')
})
