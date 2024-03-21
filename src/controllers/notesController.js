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
  const { title, content } = req.body;
  const { userId } = req; 
  try {
    const newNote = await Note.create({ user: userId, title, content });
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { userId } = req;

  try {
    const note = await Note.findById(id);
    if (note.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }else 
    {
      const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
      res.json(updatedNote);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const note = await Note.findById(id);
    if (note.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    else{
      const deletedNote = await Note.findByIdAndDelete(id);
      res.json(deletedNote);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};