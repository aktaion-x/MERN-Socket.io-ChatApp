import useLogin from '../../hooks/useLogin';
import './Login.css';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();
  console.log(isPending);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-holder">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-holder">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div>{!!isPending}</div>
        {!isPending && <button className="btn">Submit</button>}
        {isPending && <button className="btn active">Submit...</button>}
        <div className="additions">
          {error && <span className="error">{error}</span>}
          <span className="link">
            <a href="/register">Dosen&apos;t have an account? Register insted!</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
