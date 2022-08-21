import { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DBClient } from './components/DBClient';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import NewPosts from './components/NewPosts';
import SignUp from './components/SignUp';
import MyPosts from './components/MyPosts';
import PostPage from './components/PostPage';
import VisitList from './components/VisitList';
import AutoComplete from './components/AutoComplete';
import RequestPage from './components/RequestPage';
import ViewRequestPage from './components/ViewRequestPage';
import { COLLECTIONS } from './Constants';

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

  const unsubscribe = client.auth.onAuthStateChanged(user => {
    if (user) {
      client.getDocument(COLLECTIONS.REGULAR_USERS, user.uid)
        .then(snapshot => {
          client.currentUser = {
            uid: user.uid,
            data: snapshot.data()
          }
          unsubscribe()
      })
    }
  })


  // // Add this in node_modules/react-dom/index.js
  // window.React1 = require('react');

  // // Add this in your component file
  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);
  return ( 
    <div className="App">
      <Router>
        <DBClientContext.Provider value={client}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/newPost" element={<NewPosts />}/>
            <Route path="/myposts" element={<MyPosts/>} />
            <Route path="/myposts/:id" element={<PostPage/>} />
            <Route path="/visits" element={<VisitList />} />
            <Route path="/autocomplete" element={< AutoComplete/>} />
            <Route path="/visits/:id" element={<PostPage/>} />
            <Route path="/visits/:id/request" element={<RequestPage/>} />
            <Route path="/visits/:id/viewRequest" element={<ViewRequestPage/>} />
          </Routes>
        </DBClientContext.Provider>
      </Router>
    </div>

  );
}

export default App;
