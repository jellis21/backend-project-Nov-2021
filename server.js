const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const Sequelize = require('sequelize');
const { Flashcard } = require('./models');

const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/show', express.static(__dirname + '/public'));
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
// server.get('/', (req, res) => {
//     res.render('landing', {
//       partials: {
//         footer: 'partials/footer',
//         head: 'partials/head',
//         header: 'partials/header'
//       }
//     });
// });

app.use('/flashcards', flashcards);

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
        <h4 class="cat">${flashcard.category}</h4>
        <p class="ques">${flashcard.question}</p>
        
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
            Edit
          </button>
        
      </div>
      <div
        id="collapse${flashcard.id}" 
        class="collapse"
        aria-labelledby="heading${flashcard.id}"
        data-parent="#accordion"
      >
        <div class="card-body">
        <p class="ans">${flashcard.answer}</p>
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


// update flashcards
app.post('/edit', async (req, res) => {
  const { answer, category, id, question } = req.body;
  
  const updateFlashcard = await Flashcard.update(req.body, {
    where: {
      id
    }
  });

  res.json({
    message: `You updated id: ${id}, category: ${category}, question: ${question}, and answer: ${answer}`
  })
})

// delete flashcards
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const deletedFlashcard = await Flashcard.destroy({
      where: {
          id
      }
  });
  res.json({
    message: `You deleted id: ${id}`
  });
});

app.listen('8080', () => {
  console.log('server is up and running!')
})
