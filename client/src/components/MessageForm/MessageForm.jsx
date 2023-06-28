import { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';

const ShowUsers = ({ selectedUser, ws, setMessages, scrollToBottom }) => {
  const { user } = useAuthContext();
  const [allowSending, setAllowSending] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setAllowSending(false);
    if (selectedUser && newMessage) {
      ws.send(
        JSON.stringify({
          message: {
            recipient: selectedUser,
            text: newMessage,
          },
        })
      );
      setNewMessage('');
      setMessages((prev) =>
        [
          ...prev,
          { text: newMessage, sender: user.id, recipient: selectedUser, _id: Math.random() },
        ].filter((object, index, self) => {
          return index === self.findIndex((o) => o._id === object._id);
        })
      );
    }
    scrollToBottom();
    setTimeout(() => {
      setAllowSending(true);
    }, 500);
  };
  if (!!selectedUser) {
    return (
      <form onSubmit={handleSubmit} className="inline type-message">
        <input
          required
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type your message!"
        />
        {allowSending && (
          <button type="submit">
            <span className="material-symbols-outlined">send</span>
          </button>
        )}
        {!allowSending && (
          <button disabled type="submit">
            <span className="material-symbols-outlined">send</span>
          </button>
        )}
      </form>
    );
  }
};

export default ShowUsers;
