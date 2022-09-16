import { createContext, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Guest } from './objects/Guest';
import { User } from './objects/User';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/forms/LogIn';
import "./styles/app.css"
import Home from './components/Home';
import Profil from './components/Profil';
import SignUp from './components/forms/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostVisitContainer from './components/postvisit/PostVisitContainer';
import Account from './components/account/Account';


export const UserContext = createContext(null)
export const ErrorToastContext = createContext(null)

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
    if (u) { 
      setUser(new User(u.uid, u)); 
      // console.log(user);
    }
    else setUser(new Guest())
  })

  const toggleLogin = e => {
    e.preventDefault()
    setLogin(!login)
  }

  const emailVerified = useMemo(() => user instanceof User ? user.user.emailVerified : false, [user instanceof User ? user.user.emailVerified : user])
  const isLoggedIn = useMemo(() => user.isLoggedIn(), [user])

  const showToastMessage = (errorMessage) => {
    toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER
    });
  };

  return (
    <div className="app">
      <Router>
        <ErrorToastContext.Provider value={showToastMessage}>
          <UserContext.Provider value={{user, isLoggedIn}} >
            {/* {login && <LogIn toggleLogin={toggleLogin}/>} */}
            <div className="page column-container">
              <Navbar 
                toggleLogin={toggleLogin}
              />
              <div className="content">
                <ToastContainer />
                <Routes>
                  <Route exact path="/" element={<Home />}/>
                  {!isLoggedIn && <Route path="/login" element={<LogIn />} />}
                  {(!isLoggedIn || !emailVerified) && <Route path="/signup" element={<SignUp />} />}
                  {isLoggedIn && <Route path="/profile" element={<Profil/>}/>}
                  {isLoggedIn && emailVerified && <Route path="/post" element={<PostVisitContainer />} />}
                  {isLoggedIn && <Route path="/account" element={<Account />}/>}
                  <Route path="*" element={<div>Not found...</div>}/>
                </Routes>
              </div>
            </div>
          </UserContext.Provider>
        </ErrorToastContext.Provider>
      </Router>
    </div>
  );
}

export default App;
