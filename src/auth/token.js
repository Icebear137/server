const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    id = user._id.toString();
    return jwt.sign({userId: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
