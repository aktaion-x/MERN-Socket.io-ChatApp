const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const registerController = async (req, res) => {
  const { username, password, rePassword } = req.body;
  try {
    const user = await User.signup(username, password, rePassword);

    // create a token
    const token = createToken(user._id);

    res.status(201).json({ username, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const loginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerController, loginController };