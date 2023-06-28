const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  console.log('asd');
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }
  const token = authorization.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select('_id');
    console.log('User ID is:', _id);
    next();
  } catch (error) {
    res.status(401);
  }
};

module.exports = requireAuth;