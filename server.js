const express = require('express');
const fs = require ('fs');
const path = require ('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

//middleware middleware middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//grabbing da notes from api
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Couldnt read notes, please try again.' });
      }
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });
//posting da notes to api
  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Couldnt read notes, please try again' });
      }
      const notes = JSON.parse(data);
      const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(newNote);
  
      fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Couldnt read notes, please try again' });
        }
        res.json(newNote);
      });
    });
  });

  //html html html
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  //listening????
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });