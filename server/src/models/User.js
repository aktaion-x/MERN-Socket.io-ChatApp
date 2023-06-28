const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

// signup user
userSchema.statics.signup = async function (username, password, rePassword) {
  // validation
  if (!username || !password) {
    throw Error('All field must be filled!');
  }
  if (username < 3) {
    throw Error('Username must be 3 character or more!');
  }
  if (password !== rePassword) {
    throw Error('Password are not match!');
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough');
  // }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error('Username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

// login user
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All field must be filled');
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error('Incorrect username');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect Password');
  }

  return user;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;