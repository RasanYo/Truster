import { NavigationContainer} from '@react-navigation/native';
import { RecyclerViewBackedScrollViewComponent, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { navigationRef } from './';

// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { Guest } from './objects/Guest';
import { User } from './objects/User';
import { createContext, useEffect, useState } from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMenu from './screens/LoginMenu';
import Menu from './screens/Menu';
import VisitForm from './screens/VisitForm';
import VisitAppartments from './screens/VisitAppartements';
import SignUp from './screens/SignUp';
import Post from './screens/Post';

export const UserContext = createContext(null)


export default function App() {
  const [user, setUser] = useState(new Guest())

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <UserContext.Provider value={{user,setUser}}>
            <Stack.Navigator screenOptions={{headerShown : false,}}>
                <Stack.Screen name="Menu" component={Menu}/>
                      
                <Stack.Screen options={{ animation:"slide_from_bottom", presentation:"modal",headerShown : true, 
                title: 'Sign Up or Login'}} name="LoginMenu" component={LoginMenu}/>
                
                <Stack.Screen name="SignUp" component={SignUp} options={{presentation:"modal",headerShown : true,}}/>

                <Stack.Screen name="Post" component={Post}/>

                <Stack.Screen name="VisitForm" component={VisitForm}/>
                      
                <Stack.Screen name="VisitAppartments" component={VisitAppartments}/>
                        
            </Stack.Navigator>
      </UserContext.Provider> 
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});
