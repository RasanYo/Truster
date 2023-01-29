import { Image, Text, View } from "react-native"
import defaultPic from "../assets/pictures/no-profile-pic.png";

const UserPreview = ({receiver, profilePic, style={}}) => {
    return ( 
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    // borderTopWidth: 1,
                    borderColor: '#d0d0d0',
                    ...style
                }}
            >
                <Image 
                    style={{height: 50, width: 50, borderRadius: 50, marginRight: 20}} 
                    // source={profilePic ? {uri: profilePic} : defaultPic}
                    source={defaultPic}

                />
                {receiver && <Text style={{fontSize: 18}}>{receiver.firstName} {receiver.lastName.charAt(0)}.</Text>}
            </View>
        </View>
     );
}
 
export default UserPreview;