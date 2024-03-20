// src/controllers/authController.js
const User = require('../models/userModal');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../auth/token');
uuidv4();


exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signout = (req, res) => {
  res.json({ message: 'Signout successful' });
};
