const Note = require('../models/noteModel');

exports.getAllNotes = async (req, res) => {
  const { userId } = req; // Lấy userId từ token hoặc session

  try {
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNote = async (req, res) => {
  const { content } = req.body;
  const { userId } = req; // Lấy userId từ token hoặc session

  try {
    const newNote = await Note.create({ user: userId, content });
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};