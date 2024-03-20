const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});