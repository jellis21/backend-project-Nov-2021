const router = require('express').Router();
const Sequelize = require('sequelize');
const { User } = require('../models');

router.post('/add', async (req, res) => {
  const { category, question, answer } = req.body;

  const newUser = await Flashcard.create({
    category,
    question,
    answer
  });
  
    res.json({
      id: newFlashcard.id
    });
  });

  router.get('/add', (req, res) => {
    res.render('flashcard-form', {
      partials: {
        footer: 'partials/footer',
        head: 'partials/head',
        header: 'partials/header'
      }
    });
});

  module.exports = router;