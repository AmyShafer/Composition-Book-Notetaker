const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');
const notes = require('./db/notes.json');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, ('/public/index.html')))
);

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// GET Route for notes page
app.get(notes, (req, res) => 
  res.sendFile(path.join(__dirname, ('/public/notes.html')))
);

// Wildcard route takes the user to the index file
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, ('public/index.html')))
);

app.listen(PORT, () => 
  console.log('Composition Book Notetaker is ready to scribble!')
)