const express = require('express');
const db = new (require('simple-json-db'))('notes.json');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const app = express();
const port = 3000;

app.use(express.json()); 

// Lấy danh sách các ghi chú
app.get('/notes', (req, res) => {
  const notes = db.JSON();
  res.json(notes);
});

// Tạo ghi chú mới
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const id = uuidv4();
  const create_date = new Date().toISOString();
  console.log(req.body);
  const newNote = {
    id,
    title,
    content,
    create_date,
  };

  db.set(title, newNote);
  res.json(newNote);
});

// Sửa ghi chú
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!db.has(id)) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const updatedNote = {
    id,
    title,
    content,
    create_date: db.get(id).create_date,
  };

  db.set(id, updatedNote);
  res.json(updatedNote);
});

// Xoá ghi chú
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  if (!db.has(id)) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const deletedNote = db.get(id);
  db.delete(id);
  res.json(deletedNote);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
