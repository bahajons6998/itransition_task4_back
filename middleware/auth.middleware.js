const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'There is not token' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    const { email } = user;
    const usercheck = await User.findByEmail(email);
    console.log("usercheck=", usercheck);
    if (!usercheck) return res.status(403).json({ message: 'There is no user in DB' });

    if (usercheck.blocked == 1) {
      return res.status(403).json({ message: 'You are blocked' }); // Return a forbidden response
    }
    if (err) return res.status(403).json({ message: 'Wrong Token' });
    req.user = user;
    next();
  });
};
