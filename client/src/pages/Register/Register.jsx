import './Register.css';
import useSignup from '../../hooks/useSignup.js';
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const { register, isPending, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, password, rePassword);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <div className="input-holder">
          <input
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        {!isPending && <button className="btn">Submit</button>}
        {isPending && <button className="btn active">Submit...</button>}
        <div className="additions">
          {error && <span className="error">{error}</span>}
          <span className="link">
            <a href="/login">Already have an account? Login insted!</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
