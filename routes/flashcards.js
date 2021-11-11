const router = require('express').Router();
const Sequelize = require('sequelize');
const { Flashcard } = require('../models');

router.post('/add', async (req, res) => {
  const { category, question, answer } = req.body;

  const newFlashcard = await Flashcard.create({
    category,
    question,
    answer
  });
  
    res.json({
      id: newFlashcard.id,
      message: "hello"
    });
  });

  router.get('/add', (req, res) => {
    res.render('flashcardForm', {
      partials: {
        footer: 'partials/footer',
        head: 'partials/head',
        header: 'partials/header'
      }
    });
});

// display all flashcards
router.get('/show', async (req, res) => {
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
router.post('/edit', async (req, res) => {
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
router.delete('/delete/:id', async (req, res) => {
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

  module.exports = router;