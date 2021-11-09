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

  module.exports = router;