import { NavigationContainer } from '@react-navigation/native';
import { RecyclerViewBackedScrollViewComponent, StyleSheet, Text, View } from 'react-native';
import AskForAVisitStack from './routes/AskForAVisitStack';


// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { Guest } from './objects/Guest';
import { User } from './objects/User';
import { createContext, useEffect, useState } from 'react';


export const UserContext = createContext(null)

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyC1KOsIQvb-1dqRzefWggoYm5gertAiEhQ",
    authDomain: "scamna-b0b94.firebaseapp.com",
    projectId: "scamna-b0b94",
    storageBucket: "scamna-b0b94.appspot.com",
    messagingSenderId: "220971708276",
    appId: "1:220971708276:web:97a5af4c5858003baa8621",
    measurementId: "G-W8HKDF4HHW"
  }

  initializeApp(firebaseConfig);
  

  const auth = getAuth()
  const [user, setUser] = useState(new Guest())
  const currUser = auth.currentUser

  useEffect(() => {
    console.log(auth)
    setUser(new Guest())
  }, [])

  // auth.onAuthStateChanged(u => {
  //   if (u) { 
  //     setUser(new User(u.uid, u)); 
  //     // console.log(user);
  //   } else setUser(new Guest())
  // })

  useEffect(() => {
    if (currUser) { 
          setUser(new User(currUser.uid, currUser)); 
          // console.log(user);
    } else setUser(new Guest())
  
  },[currUser])

  return (
    <View>
      <UserContext.Provider value={{user}}>
        {user && <NavigationContainer>
            <AskForAVisitStack />
        </NavigationContainer>}
      </UserContext.Provider>
    </View>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'stretch',
//   },
// });
