const Message = require('../models/Message');
const User = require('../models/User');

const getChatController = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: req.params.id },
        { recipient: req.user._id, sender: req.params.id }
      ]
    });
    res.json(messages);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(['_id', 'username']);
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getChatController, getAllUsersController };