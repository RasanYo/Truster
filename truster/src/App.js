import { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Guest } from './objects/Guest';
import { User } from './objects/User';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/forms/LogIn';
import "./styles/app.css"
import Home from './components/Home';
import Profil from './components/profile/Profil';
import SignUp from './components/forms/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostVisitContainer from './components/postvisit/PostVisitContainer';
import Account from './components/account/Account';
import ComplementaryInfo from './components/signup/ComplementaryInfo';


export const UserContext = createContext(null)
export const ErrorToastContext = createContext(null)

function App() {

  //AVANT CHANGEMENT DES STYLES CSS 15.10.2022

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
  auth.onAuthStateChanged(u => {
    if (u) { 
      setUser(new User(u.uid, u)); 
      // console.log(user);
    } else setUser(new Guest())
  })

  const showToastMessage = (type="error", message) => {
    if(type === "error"){
      toast.error(message, {
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000
    });
    }else if(type === "success"){
      toast.success(message, {
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000
      })
    }
    
  };

  const [firstPage, setFirstPage] = useState(null)

  return (
    <div className="app">
      <Router>
        <ErrorToastContext.Provider value={showToastMessage}>
          <UserContext.Provider value={{user}} >
            {/* {login && <LogIn toggleLogin={toggleLogin}/>} */}
            <div className="page column-container">
              <Navbar 
                setFirstPage={setFirstPage}
              />
              <div className="content">
                <ToastContainer />
                <Routes>
                  <Route exact path="/" element={<Home />}/>
                  {!user.isLoggedIn() && <Route path="/login" element={<LogIn />} />}
                  <Route path="/login/complete_signup" element={<ComplementaryInfo />}/>
                  {!user.isLoggedIn() && <Route path="/signup" element={<SignUp />} />}
                  {user.isLoggedIn() && <Route path="/profile" element={<Profil/>}/>}
                  {user.isLoggedIn() && <Route path="/post" element={<PostVisitContainer />} />}
                  {user.isLoggedIn() && <Route path="/account" element={<Account />}/>}
                  <Route path="*" element={<div>Not found...</div>}/>
                  <Route path="/post" element={<PostVisitContainer />} />
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
