const Note = require('../models/noteModel');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({},{__v:false});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = await Note.create({ title, content });
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