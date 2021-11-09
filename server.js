require("dotenv").config();
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const Sequelize = require('sequelize');
const { Flashcard } = require('./models');

const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/show', express.static(__dirname + '/public'));
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

app.get('/', (req, res) => {
  res.render('landing');
});

// display all flashcards
app.get('/show/all', async (req, res) => {
  const flashcards = await Flashcard.findAll();

  const html = flashcards
  .map((flashcard) => {
    return `
    <div class="card mb-5">
      <div class="card-header" id="heading${flashcard.id}">
        <h4>${flashcard.category}</h4>
        <p>${flashcard.question}</p>
        <h2 class="mb-0">
          <button
            class="btn btn-dark"
            type="button"
            data-toggle="collapse"
            data-target="#collapse${flashcard.id}"
            aria-expanded="true"
            aria-controls="collapse${flashcard.id}"
          > 
            Answer
          </button>
          <button
            class="btn btn-dark"
            type="button"
            id="${flashcard.id}"
          > 
            Update
          </button>
        </h2>
      </div>
      <div
        id="collapse${flashcard.id}" 
        class="collapse"
        aria-labelledby="heading${flashcard.id}"
        data-parent="#accordion"
      >
        <div class="card-body">
          ${flashcard.answer}
        </div>
      </div>
    </div>  
    `
  })
  .join('')
  
  res.render('flashcard-list', {
    locals: {
      flashcards: html
    }
  });
});

// filter flashcards by category
app.get('/show/:category', async (req, res) => {
  const flashcards = await Flashcard.findAll({
    where: {
      category: req.params.category
    }
  });

  const html = flashcards
  .map((flashcard) => {
    return `
    <div class="accordion mx-auto" id="accordion" style="width: 75%">
    <div class="card mb-5" id="${flashcard.id}">
      <div class="card-header" id="heading${flashcard.id}">
        <h4>${flashcard.category}</h4>
        <p>${flashcard.question}</p>
        <h2 class="mb-0">
          <button
            class="btn btn-dark"
            type="button"
            data-toggle="collapse"
            data-target="#collapse${flashcard.id}"
            aria-expanded="true"
            aria-controls="collapse${flashcard.id}"
          > 
            Answer
          </button>
          <button
            class="btn btn-dark"
            type="button"
            id="${flashcard.id}"
          > 
            Update
          </button>
        </h2>
      </div>
      <div
        id="collapse${flashcard.id}" 
        class="collapse"
        aria-labelledby="heading${flashcard.id}"
        data-parent="#accordion"
      >
        <div class="card-body">
          ${flashcard.answer}
        </div>
      </div>
    </div>  
  </div>
    `
  })
  .join('')
  
  res.render('flashcard-list', {
    locals: {
      flashcards: html
    }
  });

})

// update flashcards
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
console.log(id)
  res.json({
    message: `You clicked on ${id}`
  })
})

app.listen('8080', () => {
  console.log('server is up and running!')
})
