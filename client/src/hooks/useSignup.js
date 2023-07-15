import { useState } from 'react';
import useAuthContext from './useAuthContext.js';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const register = async (username, password, rePassword) => {
    setIsPending(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rePassword }),
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
  return { register, isPending, error };
};

export default useSignup;