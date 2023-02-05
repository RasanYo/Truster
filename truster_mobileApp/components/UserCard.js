import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context';
import defaultPic from '../assets/pictures/no-profile-pic.png';
import { Image, Text, View } from 'react-native';


const UserCard = ({
  uid,
  style={}
}) => {

  const {user} = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    user.getUser(uid).then(data => {
      setUserData(data);
    });
  }, []);

  return ( 
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: '#d0d0d0',
          ...style
        }}
      >
        <Image 
          style={{height: 50, width: 50, borderRadius: 50, marginRight: 20}} 
          source={defaultPic}

        />
        {userData && <Text style={{fontSize: 18}}>{userData.firstName} {userData.lastName.charAt(0)}.</Text>}
      </View>
    </View>
  );
};
 
export default UserCard;