const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, ('/public/index.html')))
);

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// GET Route for notes page
app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, ('/public/notes.html')))
);

// Wildcard route takes the user to the index file
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, ('public/index.html')))
);

app.listen(PORT, () => 
  console.log('Composition Book Notetaker is ready to scribble!')
)