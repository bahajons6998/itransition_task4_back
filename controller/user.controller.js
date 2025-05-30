const User = require('../model/user.model');

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'There is a error' });
    res.json(results);
  });
};

exports.blockSelectedUser = async (req, res) => {
  try {
    const usersData = req.body; // Array of user objects with email and fields to update
    console.log('usersData controller=', usersData)
    const result = await User.updateAndBlock(usersData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'There is a error' });
  }
};

exports.unblockSelectedUser = async (req, res) => {
  try {
    const usersData = req.body;
    console.log('usersData controller=', usersData)
    const result = await User.updateAndUnblock(usersData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'There is a error' });
  }
};
exports.deletedSelectedUser = async (req, res) => {
  
  try {
    const usersData = req.body; 
    console.log('usersData controller=', usersData)
    const result = await User.deleteUsers(usersData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'There is a error' });
  }
};
