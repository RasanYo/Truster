import { createContext, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Guest } from './objects/Guest';
import { User } from './objects/User';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn';
import "./styles/app.css"


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
  const unsubscribeAuthListener = auth.onAuthStateChanged(u => {
    if (u) setUser(new User(u.uid))
    else setUser(new Guest())
  })

  const isLoggedIn = useMemo(() => user.isLoggedIn(), [user])



  return (
    <div className="app">
      <Router>
        <UserContext.Provider value={{user, isLoggedIn}} >
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={user.isLoggedIn() && <div>Logged in</div>}/>
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
