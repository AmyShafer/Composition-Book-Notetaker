const notes = require('express').Router();
let notesData = require('../db/notes.json');
const fs = require('fs');
const path = require('path');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/notes.json'), 'utf8', (err, data) => res.json(JSON.parse(data)));
});

// POST /api/notes should receive a new note
notes.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notesData.length + 1;
    
    if (req.body.title) {
      notesData.push(newNote);
    }

     fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesData), (err, data) => res.json(JSON.parse(data)))
    
    res.end();
});

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. 
notes.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  
  const deleted = notesData.find(currentNotes => currentNotes.id == id);
  console.log(deleted);
  if (deleted) {
    notesData = notesData.filter(currentNotes => currentNotes.id != id);
  } else {
    res.status(404).json({ message: "The note you are looking for is not here."})
  }
  res.end();
});

module.exports = notes;