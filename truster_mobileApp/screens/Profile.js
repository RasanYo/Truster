import { Text, TouchableOpacity, View } from "react-native";

const Profile = ({route, navigation}) => {

    return ( 
        <View style={{marginTop: 50}}>
            <ProfileLink onClick={() => navigation.navigate("My Posts")} title="My Posts"/>
            <ProfileLink onClick={() => navigation.navigate("My Visits")}title="My upcoming Visits"/>
            <ProfileLink onClick={() => navigation.navigate("My Requests")} title="My pending Requests"/>
        </View>
     );
}
 
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
    )
}