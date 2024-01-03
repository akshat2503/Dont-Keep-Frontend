import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NoteState from './components/context/notes/NoteState';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';
import Notes from './components/Notes';


function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  return (
    <>
      <NoteState>
        <Router>
          <Routes>
            <Route exact path="/" element={<><Navbar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} /><Notes setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible} /></>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
