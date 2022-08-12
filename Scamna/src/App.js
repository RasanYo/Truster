import logo from './logo.svg';
import './App.css';
import TestBlock from './components/TestBlock';
import { DBClient } from './components/DBClient';
import React from 'react';



const firebaseConfig = {
  apiKey: "AIzaSyC1KOsIQvb-1dqRzefWggoYm5gertAiEhQ",
  authDomain: "scamna-b0b94.firebaseapp.com",
  projectId: "scamna-b0b94",
  storageBucket: "scamna-b0b94.appspot.com",
  messagingSenderId: "220971708276",
  appId: "1:220971708276:web:97a5af4c5858003baa8621",
  measurementId: "G-W8HKDF4HHW"
}

export const DBContext = React.createContext(null)

function App() {



  return (
    <DBContext.Provider value={new DBClient(firebaseConfig)}>
      <TestBlock/>
    </DBContext.Provider>
  );
}

export default App;
