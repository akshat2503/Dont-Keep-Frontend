import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './components/context/notes/NoteState';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Routes>
            <Route exact path="/" element={<><Navbar /><Home /></>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
