import logo from './logo.svg';
import './App.css';
import { createContext } from 'react';
import { DBClient } from './components/DBClient';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyC1KOsIQvb-1dqRzefWggoYm5gertAiEhQ",
  authDomain: "scamna-b0b94.firebaseapp.com",
  projectId: "scamna-b0b94",
  storageBucket: "scamna-b0b94.appspot.com",
  messagingSenderId: "220971708276",
  appId: "1:220971708276:web:97a5af4c5858003baa8621",
  measurementId: "G-W8HKDF4HHW"
}

export const DBContext = createContext(null)

function App() {

  // Add this in node_modules/react-dom/index.js
  window.React1 = require('react');

  // Add this in your component file
  require('react-dom');
  window.React2 = require('react');
  console.log(window.React1 === window.React2);
  return (
    <Router>
      <div className="App">
        <DBContext.Provider value={new DBClient(firebaseConfig)}>
          <Navbar/>
          <div className="content">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </DBContext.Provider>
      </div>
    </Router>
  );
}

export default App;
