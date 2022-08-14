import { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DBClient } from './components/DBClient';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import SignUp from './components/SignUp';

export const DBClientContext = createContext(null)

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyC1KOsIQvb-1dqRzefWggoYm5gertAiEhQ",
    authDomain: "scamna-b0b94.firebaseapp.com",
    projectId: "scamna-b0b94",
    storageBucket: "scamna-b0b94.appspot.com",
    messagingSenderId: "220971708276",
    appId: "1:220971708276:web:97a5af4c5858003baa8621",
    measurementId: "G-W8HKDF4HHW"
  }

  const client = new DBClient(firebaseConfig)

  // // Add this in node_modules/react-dom/index.js
  // window.React1 = require('react');

  // // Add this in your component file
  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);
  return ( 
    <Router>
      <DBClientContext.Provider value={client}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </DBClientContext.Provider>
    </Router>
  );
}

export default App;
