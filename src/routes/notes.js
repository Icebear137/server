const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.requireAuth, notesController.getAllNotes);
router.post('/', authMiddleware.requireAuth, notesController.createNote);
router.put('/:id', authMiddleware.requireAuth, notesController.updateNote);
router.delete('/:id', authMiddleware.requireAuth, notesController.deleteNote);

module.exports = router;
