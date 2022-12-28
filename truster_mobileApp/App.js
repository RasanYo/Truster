

// import * as firebase from 'firebase';


import { Guest } from './objects/Guest';
import { useEffect, useState } from 'react';


// import Navigator from './routes/homeStack'
import { UserContext } from './context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMenu from './screens/LoginMenu';
import Menu from './screens/Menu';
import SignUp from './screens/SignUp';
import PostPreview from './screens/PostPreview';
import VisitForm from './screens/VisitForm';
import MapSearchVisit from './screens/MapSearchVisit';
import { NavigationContainer } from '@react-navigation/native';
import VisitAppartments from './screens/VisitAppartements';
import { 
  geohashQueryBounds, 
  distanceBetween 
} from "geofire-common"
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PostScreen from './components/PostScreen';

export default function App() {


  const [user, setUser] = useState(new Guest())

  // useEffect(() => {
  //     console.log(geohashQueryBounds([48.57311010, 8.08595896], 10*1000))
  // },[])

  const Stack = createNativeStackNavigator();
  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <UserContext.Provider value={{user,setUser}}>
              <Stack.Navigator screenOptions={{headerShown : false,}}>
                  <Stack.Screen name="Menu" component={Menu}/>
                        
                  <Stack.Screen options={{ animation:"slide_from_bottom", presentation:"modal",headerShown : true, 
                  title: 'Sign Up or Login'}} name="LoginMenu" component={LoginMenu}/>
                  
                  <Stack.Screen name="SignUp" component={SignUp} options={{presentation:"modal",headerShown : true,}}/>

                  <Stack.Screen name="VisitForm" component={VisitForm}/>

                  <Stack.Screen name="PostPreview" component={PostPreview}/>
                        
                  {/* <Stack.Screen name="MapSearchVisit" component={VisitAppartments}/> */}
                  <Stack.Screen name="MapSearchVisit" component={MapSearchVisit}/>

                  <Stack.Screen name="Post" component={PostScreen}/>
                          
              </Stack.Navigator>
        </UserContext.Provider> 
      </NavigationContainer>
    </ActionSheetProvider>

    // <UserContext.Provider value={user}>
    //   <Navigator />
    // </UserContext.Provider>

    
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
