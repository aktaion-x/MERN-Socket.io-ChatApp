import useAuthContext from '../../hooks/useAuthContext';

const ShowUsers = ({ setMessages, setSelectedUser, scrollToBottom, onlineUsers, offlineUsers }) => {
  const { user } = useAuthContext();
  const handleUserSelect = async (e, id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND}chat/` + id, {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    });
    const json = await res.json();
    if (json.error) {
      return;
    }
    setMessages(json);
    document
      .querySelectorAll('.Chat .side-bar ul li')
      .forEach((li) => li.classList.remove('active'));
    e.target.closest('li').classList.add('active');
    if (document.querySelector('.side-bar.active')) {
      document.querySelector('.side-bar.active').classList.remove('active');
    }
    setSelectedUser(id);
    scrollToBottom();
  };
  const colors = ['#00b8a6', '#ffc5c0', '#1baa5a', '#daaefa', '#4e8cec', '#de4d40'];

  return (
    <ul>
      {Object.keys(onlineUsers).length > 0 &&
        Object.keys(onlineUsers).map((user_id) => {
          const idBase10 = parseInt(user_id, 16);
          const index = idBase10 % colors.length;
          const color = colors[index];
          if (user_id !== user.id) {
            return (
              <li className="online" key={user_id} onClick={(e) => handleUserSelect(e, user_id)}>
                <div className="avatar" style={{ backgroundColor: color }}>
                  <span>{onlineUsers[user_id].split('')[0]}</span>
                </div>
                <span className="username">{onlineUsers[user_id]}</span>
              </li>
            );
          }
        })}
      {offlineUsers.length > 0 &&
        offlineUsers.map((user) => {
          const idBase10 = parseInt(user._id, 16);
          const index = idBase10 % colors.length;
          const color = colors[index];
          return (
            <li key={user._id} onClick={(e) => handleUserSelect(e, user._id)}>
              <div className="avatar" style={{ backgroundColor: color }}>
                <span>{user.username.split('')[0]}</span>
              </div>
              <span className="username">{user.username}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default ShowUsers;
