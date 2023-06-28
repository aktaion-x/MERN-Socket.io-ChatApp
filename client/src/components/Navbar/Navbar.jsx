import useAuthContext from '../../hooks/useAuthContext';
import './Navbar.css';

const Navbar = () => {
  const { dispatch, user } = useAuthContext();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="Navbar">
      <nav>
        <div className="logo">
          <h1>ChatApp</h1>
        </div>
        <ul className="links">
          {!user && (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </>
          )}
          <li>
            <a href="/about">About</a>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
