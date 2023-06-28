import useAuthContext from '../../hooks/useAuthContext';

const ShowMessages = ({ messages, selectedUser }) => {
  const { user } = useAuthContext();
  return (
    <>
      {!selectedUser && <div className="no-user-selected">No user selected</div>}
      {!!selectedUser && (
        <div className="messages">
          {messages.map((message) => {
            if (message.sender == user.id) {
              return (
                <div key={Math.random()} className="first-user">
                  <span className="message">{message.text}</span>
                </div>
              );
            } else if (message.sender == selectedUser) {
              return (
                <div key={Math.random()} className="second-user">
                  <span className="message">{message.text}</span>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default ShowMessages;
