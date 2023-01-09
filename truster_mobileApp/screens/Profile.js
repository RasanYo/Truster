import { Text, TouchableOpacity, View } from "react-native";
import ChatPage from "./ChatPage";

const Profile = ({route, navigation}) => {

    return ( 
        <View>
            <Text>Profile</Text>
            {/* <ChatPage /> */}
            <TouchableOpacity
                onPress={() => {navigation.navigate('MyPosts')}}
            >
                <Text>My Posts</Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default Profile;