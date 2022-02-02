const express = require('express');
const path = require('path');
const fs = require('fs');

const uuid = require('./helpers/uuid');

const noteData = require('./db/db.json');
const { fstat } = require('fs');

// const reviews = require('./db/reviews');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title , text} = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // const noteList = JSON.stringify(noteData);
    noteData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(noteData), function (err) {
      if(err) throw err;
      console.log(noteData)
      console.log('note added');
    });
    console.log(newNote);
    res.status(201).json('Note has been added');
  } else {
    res.status(500).json('Error adding note');
  }
});

app.delete('/api/notes/:id', function (req, res) {
  res.send('Got a DELETE request')
})

    app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
