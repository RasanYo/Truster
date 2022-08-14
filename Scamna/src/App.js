import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';

function App() {
  
  // // Add this in node_modules/react-dom/index.js
  // window.React1 = require('react');

  // // Add this in your component file
  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);
  return ( 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
