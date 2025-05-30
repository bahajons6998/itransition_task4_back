const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id: user.id, email: user.email, blocked: user.blocked }, secret);
};
