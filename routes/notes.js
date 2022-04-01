const notes = require('express').Router();
const notesData = require('../db/notes.json');
const fs = require('fs');
const path = require('path');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  res.json(notesData);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

notes.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notesData.length + 1;
    
    if (this.title && this.text) {
      newNote = {
          title,
          text,
      };

      notesData.push(newNote);

     fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesData), (err, data) => res.json(JSON.parse(data)))
     console.log(data);
    } else {
      console.log("Error."); 
    }
    res.end();
});

module.exports = notes;