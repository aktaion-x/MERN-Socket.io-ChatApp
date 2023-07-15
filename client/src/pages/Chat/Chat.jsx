import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import ShowUsers from '../../components/ShowUsers/ShowUsers';
import MessageForm from '../../components/MessageForm/MessageForm';
import ShowMessages from '../../components/ShowMessages/ShowMessages';
import './Chat.css';

const Chat = () => {
  const { user } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState({});
  const [offlineUsers, setOfflineUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const cookies = new Cookies();
    cookies.set('token', user.token);
    cookies.set('username', user.username);
    const ws = new WebSocket(import.meta.env.VITE_SOCKET_SERVER);
    setWs(ws);
    ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if ('online' in data) {
        showOnlineUsers(data.online);
      } else if ('newMessage' in data) {
        setMessages((prev) => {
          return [
            ...prev,
            {
              text: data.newMessage['text'],
              sender: data.newMessage['sender'],
              recipient: user.id,
              _id: data.newMessage['_id'],
            },
          ].filter((object, index, self) => {
            return index == self.findIndex((o) => o._id == object._id);
          });
        });
        scrollToBottom();
      }
    });
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}chat/all`, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (json.error) {
        return;
      }
      const allId = [...Object.keys(onlineUsers)];
      const filteredArray = json.filter((user) => {
        let excludeId = '';
        for (let i = 0; i < allId.length; i++) {
          const id = allId[i];
          user._id == id ? (excludeId = user._id) : false;
        }
        return user._id !== excludeId;
      });
      setOfflineUsers(filteredArray);
      console.log(offlineUsers);
    };
    if (onlineUsers) {
      fetchAllUsers();
    }
  }, [onlineUsers]);

  const showOnlineUsers = (data) => {
    const onlineUsers = {};
    data.forEach(({ user_id, username }) => {
      onlineUsers[user_id] = username;
    });
    setOnlineUsers(onlineUsers);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const messagesBox = document.querySelector('.messages');
      if (messagesBox) {
        messagesBox.scrollBy(0, messagesBox.scrollHeight);
      }
    }, 0);
  };

  const handleSidebarBtn = () => {
    document.querySelector('.side-bar').classList.add('active');
  };

  return (
    <div className="Chat">
      <div className="side-bar-btn" onClick={handleSidebarBtn}>
        Contacts
      </div>
      <div className="side-bar">
        <h2>Contacts</h2>
        <ShowUsers
          setMessages={setMessages}
          setSelectedUser={setSelectedUser}
          scrollToBottom={scrollToBottom}
          onlineUsers={onlineUsers}
          offlineUsers={offlineUsers}
        />
      </div>
      <div className="chat-container">
        <ShowMessages messages={messages} selectedUser={selectedUser} />
        <MessageForm
          selectedUser={selectedUser}
          ws={ws}
          setMessages={setMessages}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  );
};

export default Chat;
/* 
array1 = [
    {
        "user_id": "648bb27fcb5e012e6295449f",
        "username": "zzcc"
    },
    {
        "user_id": "64892ff3534601a2e08c59c2",
        "username": "qwe"
    },
    {
        "user_id": "648a7bebdcd91c4e1fee8cdf",
        "username": "qwer"
    },
]
array2 = [
    {
        "_id": "64892d5889fda3470843efab",
        "username": "dsa"
    },
    {
        "_id": "64892de4534601a2e08c59a4",
        "username": "asd"
    },
    {
        "_id": "64892e2a534601a2e08c59b1",
        "username": "asdd"
    },
    {
        "_id": "64892e40534601a2e08c59b7",
        "username": "asddd"
    },
    {
        "_id": "64892e8e534601a2e08c59bb",
        "username": "zxc"
    },
    {
        "_id": "64898af0e0ec46c61e30e56c",
        "username": "assd"
    },
    {
        "_id": "64898b91e0ec46c61e30e56f",
        "username": "aassaa"
    },
    {
        "_id": "648a7bebdcd91c4e1fee8cdf",
        "username": "qwer"
    },
    {
        "_id": "648bb27fcb5e012e6295449f",
        "username": "zzcc"
    }
]
*/
