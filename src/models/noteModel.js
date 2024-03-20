const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  create_date: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
