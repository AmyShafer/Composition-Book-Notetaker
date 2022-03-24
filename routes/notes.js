const notes = require('express').Router();
const notesData = require('../db/notes.json');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => 
readFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
      const newNote = {
          title,
          text,
      };
    } else {
      console.log("You done messed up, B!"); 
    }
    res.end();
});

exports.module = notes;