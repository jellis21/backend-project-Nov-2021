const express = require('express');
const es6Renderer = require('express-es6-template-engine');
// const Sequelize = require('sequelize');
// const { Flashcard } = require('./models');

const app = express();

// app.use('/', express.static(__dirname + '/public'));
// app.use('/contacts', express.static(__dirname + '/public'));
app.use(express.json());

// setup the template engine
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/heartbeat', (req, res) => {
  res.render('hello world');
})

// const {contacts} = require('./routes');
// server.get('/', (req, res) => {
//     res.render('landing', {
//       partials: {
//         footer: 'partials/footer',
//         head: 'partials/head',
//         header: 'partials/header'
//       }
//     });
// });

// server.use('/contacts', contacts);

app.get('/', (req, res) => {
  res.render('landing');
})

app.listen('8080', () => {
  console.log('server is up and running!')
})
