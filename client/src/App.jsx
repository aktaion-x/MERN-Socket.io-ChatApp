import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
import About from './pages/About/About';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/chat" /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/chat" /> : <Register />} />
            <Route path="/chat" element={!user ? <Navigate to="/login" /> : <Chat />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
