const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const ws = require('ws');
const Message = require('./src/models/Message');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.headers.cookie);
});
app.use('/user', require('./src/routes/user.routes'));
app.use('/chat', require('./src/routes/chat.routes'));

mongoose.connect(process.env.MONGO_URI, { dbName: 'mernchat' })
  .then(() => {
    const server = app.listen(port, () => console.log(`Server is lestining on port ` + port));
    const wss = new ws.WebSocketServer({ server });
    wss.on('connection', (ws, req) => {
      const cookies = req.headers.cookie;
      if (cookies) {
        const tokenString = cookies.split(';').find(string => string.trim().startsWith('token=')).trim();
        const usernameString = cookies.split(';').find(string => string.trim().startsWith('username=')).trim();
        if (tokenString && usernameString) {
          const token = tokenString.split('=')[1];
          const username = usernameString.split('=')[1];
          const user = jwt.verify(token, process.env.SECRET);
          ws._id = user._id;
          ws.username = username;
        }
      }
      [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
          online: [...wss.clients].map(c => {
            return {
              user_id: c._id,
              username: c.username
            };
          })
        }));
      });
      ws.on('message', async (message) => {
        const newMessage = JSON.parse(message.toString());
        const { recipient, text } = newMessage.message;
        if (recipient && text) {
          const doc = await Message.createMessage(text, ws._id, recipient);
          console.log(doc);
          [...wss.clients]
            .filter(c => c._id === recipient)
            .forEach(c => c.send(JSON.stringify({ newMessage: { text, recipient, sender: ws._id, _id: doc._id } })));
        }
      });
    });
  }).catch((err) => {
    console.log(err);
  });
