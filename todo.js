const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  create_date: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

app.use(express.json());

// Lấy danh sách các ghi chú
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({},{__v:false});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tạo ghi chú mới
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = await Note.create({ title, content });
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sửa ghi chú
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xoá ghi chú
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
