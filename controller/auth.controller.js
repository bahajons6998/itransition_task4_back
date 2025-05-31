const User = require('../model/user.model');
const { hashPassword, comparePassword } = require('../utils/password.hash');
const { generateToken } = require('../utils/token');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("name=", name);
  const hashed = await hashPassword(password);

  try {
    const emailExists = await User.findByEmail(email);
    if (emailExists) return res.status(400).json({ error: 'Email already exsisted' });

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Please, fill all gaps' });

    User.create({ name, email, password: hashed, created_time: new Date(), last_login: new Date(), blocked: false }, (err, result) => {
      if (err) return res.status(400).json({ error: 'Registration error' });
      res.status(201).json({ message: 'Registered successfully' });
    })
  }
  catch (err) {
    res.status(500).json({ error: 'Something wrong in register' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    console.log("user=", user);
    if (!user) return res.status(400).json({ error: 'Email incorrect' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ error: 'Password incorrect' });

    const token = generateToken(user);
    User.updateLastLogin(user.email);

    res.json({ message: 'Loged in successfully', user, token });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
};
