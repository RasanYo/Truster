import { Guest } from './objects/Guest';
import { useState } from 'react';


import { UserContext } from './context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMenu from './screens/authentification_screens/LoginMenu';
import Menu from './screens/Menu';
import SignUp from './screens/authentification_screens/SignUp';
import VisitForm from './screens/VisitForm';
import MapSearchVisit from './screens/MapSearchVisit';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import VisitAppartments from './screens/VisitAppartements';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PostScreen from './components/PostScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './components/chat/Chat';
import Favorites from './screens/Favorites';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Profile from './screens/Profile';
import MyPosts from './screens/profile_screens/MyPosts';
import { LogBox } from 'react-native';
import ChatPage from './screens/ChatPage';
import MyRequests from './screens/profile_screens/MyRequests';
import MyVisits from './screens/profile_screens/MyVisits';
import PersonalInfo from './screens/profile_screens/PersonalInfo';
import { ToastProvider } from 'react-native-toast-notifications';
import Requests from './screens/Requests';
import RealtimeChat from './components/chat/RealtimeChat';

LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(new Guest());

  return (
    <ToastProvider>
      <ActionSheetProvider>
        <NavigationContainer>
          <UserContext.Provider value={{user,setUser}}>
            <Tabs></Tabs>
          </UserContext.Provider> 
        </NavigationContainer>
      </ActionSheetProvider>
    </ToastProvider>
  );
}

function Tabs() {


  return ( 
    <Tab.Navigator screenOptions={{
      headerShown : false,

    }}>



      <Tab.Screen name="Explore" component={MakeAVisitStack} 
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({color, size}) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        })}
      />

      <Tab.Screen name="Favorites" component={Favorites}
        options={({ route }) => ({
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
        })}
      />

      {/* <Tab.Screen name="Reservations" component={Reservations}
        options={({ route }) => ({
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="greenhouse" size={size} color={color} />
          ),
        })}
      /> */}

      <Tab.Screen name="Messages" component={ChatPage}
        options={({ route }) => ({
          tabBarIcon: ({color, size}) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
        })}
      />

      <Tab.Screen name="Profile" component={ProfileMenu}
        options={({ route }) => ({
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        })}
      />

    </Tab.Navigator>
  );
}

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  if( routeName == 'MapSearchVisit' || routeName == 'VisitForm' || routeName == 'PostPreview' || routeName == 'SignUp' || routeName == 'LoginMenu' || routeName == 'Chat') {
    return 'none';
  }
  return 'flex';
};

const MakeAVisitStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown : false,}}>
      <Stack.Screen name="Menu" component={Menu}/>
      <Stack.Screen name="MapSearchVisit" component={MapSearchVisit}/>
      <Stack.Screen name="ListSearchVisit" component={VisitAppartments} options={{ animation:'slide_from_bottom'}}/>
      <Stack.Screen name="VisitForm" component={VisitForm}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{presentation:'modal',headerShown : true,}}/>
      <Stack.Screen options={{ animation:'slide_from_bottom', presentation:'modal',headerShown : true, 
        title: 'Sign Up or Login'}} name="LoginMenu" component={LoginMenu}/>
      <Stack.Screen name="PostPreview" component={PostScreen}/>
      <Stack.Screen options={{headerShown : true}} name="Personal Informations" component={PersonalInfo}/>
      <Stack.Screen options={{headerShown : true}} name="My Posts" component={MyPosts}/>
      <Stack.Screen options={{headerShown : true}} name="My Visits" component={MyVisits}/>
      <Stack.Screen options={{headerShown : true}} name="My Requests" component={MyRequests}/>
      <Stack.Screen name="Chat" component={RealtimeChat}/>
      <Stack.Screen options={{headerShown : true}} name="Requesters" component={Requests}/>
      
    </Stack.Navigator>
  );
};

const ProfileMenu = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen options={{headerShown : false}} name="Profile" component={Profile}/>
      <ProfileStack.Screen options={{headerShown : true}} name="Personal Informations" component={PersonalInfo}/>
      <ProfileStack.Screen options={{headerShown : true}} name="My Posts" component={MyPosts}/>
      <ProfileStack.Screen options={{headerShown : true}} name="My Visits" component={MyVisits}/>
      <ProfileStack.Screen options={{headerShown : true}} name="My Requests" component={MyRequests}/>
      
    </ProfileStack.Navigator>
  );
};

