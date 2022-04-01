const notes = require('express').Router();
const notesData = require('../db/notes.json');
const fs = require('fs');
const path = require('path');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  res.json(notesData);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// So it will look like this —> where you grab the newNote (which is all the data of title and text) and then you set the id! Perfect you have a whole newNote object already (because the starter code builds it for you and passes it through the req.body)
// Then --> the rest is all good! Just need to delete the console.log(data) because where that is called data is no longer defined because it’s a one liner function call

notes.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notesData.length + 1;
    
    if (req.body.title) {
      notesData.push(newNote);
    }

     fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesData), (err, data) => res.json(JSON.parse(data)))
    
    res.end();
});


// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

notes.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const deleted = notesData.find(currentNotes => currentNotes.id === id);
 
  if (deleted) {
    notesData = notesData.filter(currentNotes => currentNotes.id !== id);
  } else {
    res.status(404).json({ message: "The note you are looking for is not here."})
  }
  res.end();
});

module.exports = notes;