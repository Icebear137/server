const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes');

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});