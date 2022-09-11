import { createContext, useMemo, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Guest } from './objects/Guest';
import { User } from './objects/User';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn';
import "./styles/app.css"
import Home from './components/Home';
import SignUp from './components/SignUp';
import Profil from './components/Profil';


export const UserContext = createContext(null)

function App() {

  /**
   * @throws {Error} when 2 different React versions are present
   * Can be cause for error "Invalid hook call"
   */
  require('react-dom');
  window.React2 = require('react');
  // if (window.React1 !== window.React2) {
  //   throw new Error("Two different versions of React are present")
  // }
  

  const firebaseConfig = {
    apiKey: "AIzaSyC1KOsIQvb-1dqRzefWggoYm5gertAiEhQ",
    authDomain: "scamna-b0b94.firebaseapp.com",
    projectId: "scamna-b0b94",
    storageBucket: "scamna-b0b94.appspot.com",
    messagingSenderId: "220971708276",
    appId: "1:220971708276:web:97a5af4c5858003baa8621",
    measurementId: "G-W8HKDF4HHW"
  }

  initializeApp(firebaseConfig)

  const auth = getAuth()
  const [user, setUser] = useState(new Guest())
  const [login, setLogin] = useState(false)
  const unsubscribeAuthListener = auth.onAuthStateChanged(u => {
    if (u) setUser(new User(u.uid))
    else setUser(new Guest())
  })

  const toggleLogin = e => {
    e.preventDefault()
    setLogin(!login)
  }

  const isLoggedIn = useMemo(() => user.isLoggedIn(), [user])


  return (
    <div className="app">
      <Router>
        <UserContext.Provider value={{user, isLoggedIn}} >
          {login && <LogIn toggleLogin={toggleLogin}/>}
          <div className="page">
            <Navbar 
              toggleLogin={toggleLogin}
            />
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Home />}/>
                {!isLoggedIn && <Route path="/login" element={<LogIn />} />}
                {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
                {isLoggedIn && <Route path="/profile" element={<Profil/>}/>}
                <Route path="*" element={<div>Not found...</div>}/>
              </Routes>
            </div>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;