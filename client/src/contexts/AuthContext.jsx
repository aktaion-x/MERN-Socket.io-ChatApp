import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      new window.Headers().set('cookies', `bearer=${action.payload.token}`);
      return { user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return null;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return <AuthContext.Provider value={{ dispatch, ...state }}>{children}</AuthContext.Provider>;
};
