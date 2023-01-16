import { Text, TouchableOpacity, View } from "react-native";
import ChatPage from "./ChatPage";

const Profile = ({route, navigation}) => {

    return ( 
        <View style={{marginTop: 50}}>
            {/* <ChatPage /> */}
            <TouchableOpacity
                onPress={() => {navigation.navigate('My Posts')}}
            >
                <Text>My Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {navigation.navigate('My Chats')}}
            >
                <Text>My Chats</Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default Profile;