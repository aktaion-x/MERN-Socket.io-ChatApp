import { useState } from 'react';
import useAuthContext from './useAuthContext.js';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (username, password) => {
    setIsPending(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (json.error) {
        setIsPending(false);
        setError(json.error);
        return;
      }
      setIsPending(false);
      setError(null);
      dispatch({ type: 'LOGIN', payload: json });
    } catch (error) {
      setIsPending(false);
      setError(error);
    }
  };
  return { login, isPending, error };
};

export default useLogin;