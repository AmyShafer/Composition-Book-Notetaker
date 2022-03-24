const express = require('express');

// Import the module routers for notes
const notesRouter = require('./notes');

const app = express();

app.use('./notes', notesRouter);

module.exports = app;