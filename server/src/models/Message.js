const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
  },
}, { timestamps: true });

messageSchema.statics.createMessage = async function (text, sender, recipient) {
  const message = await this.create({ text, sender, recipient });

  return message;
};

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;