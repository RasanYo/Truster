import { Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../context';
import { useContext } from 'react';

const Profile = ({route, navigation}) => {
  const {user,setUser} = useContext(UserContext);

  return ( 
    <View>
      <Header>
        <Text style={{fontSize: 24}}>Profile</Text>
      </Header>
      {!user.isLoggedIn() &&
        
        <View>
          {console.log('user is logged in')}
          <Text>Sorry you are not logged In</Text>
        </View> }
      {user.isLoggedIn() &&
        <View>
          {console.log('user is logged in ? ' + user.isLoggedIn())}
          <ProfileLink onClick={() => navigation.navigate('Personal Informations')} title="Personal Informations"/>
          <ProfileLink onClick={() => navigation.navigate('My Posts')} title="My Posts"/>
          <ProfileLink onClick={() => navigation.navigate('My Visits')}title="My upcoming Visits"/>
          <ProfileLink onClick={() => navigation.navigate('My Requests')} title="My pending Requests"/>
      
          <TouchableOpacity onPress={() => user.logout()} style={{flexDirection:'row', padding:10, borderColor:'black',borderRadius:10,borderWidth:1,width:120,marginTop:50,marginLeft:30}}>
            <MaterialIcons name="logout" size={24} color="black" />

            
            <Text style={{textAlign:'center', fontSize:20, marginLeft:10}}>Logout</Text> 
          </TouchableOpacity>
        </View>}
      
    </View>
  );
};
 
export default Profile;

const ProfileLink = ({
  onClick=() => {},
  title
}) => {
  return (
    <View 
      style={{
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#d0d0d0',
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={onClick}> 
        <Text style={{fontSize: 20}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};