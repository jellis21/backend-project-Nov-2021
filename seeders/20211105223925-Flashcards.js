"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Flashcards",
      [
        {
          category: "Computer Science",
          question:
            "Which programs are used to translate high-level language into a machine language code?",
          answer:
            "Programming language translators, assemblers, compilers, and interpreters.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Biology",
          question:
            "What process produces a duplicate of the original cell?",
          answer:
            "Mitosis",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Flashcards', null, {});
  }
};
