import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import defaultPic from "../../assets/pictures/no-profile-pic.png";
import { UserContext } from "../../context";

const ChatPreview = (props) => {

    const {user} = useContext(UserContext)
    const [profilePic, setProfilePic] = useState(null)
    const [receiver, setReceiver] = useState()

    useEffect(() => {
        user.getProfilePictureURL(props.receiverID).then(url => {
            setProfilePic(url)
        })
        user.getUser(props.receiverID).then(data => {
            setReceiver(data)
        })
    }, [])

    return ( 
        <TouchableOpacity onPress={() => props.navigation.navigate("Chat", {receiverID: props.receiverID, postID: props.postID})}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderColor: '#d0d0d0'
                }}
            >
                <Image 
                    style={{height: 50, width: 50, borderRadius: 50, marginRight: 20}} 
                    // source={profilePic ? {uri: profilePic} : defaultPic}
                    source={defaultPic}

                />
                {receiver && <Text style={{fontSize: 18}}>{receiver.firstName} {receiver.lastName.charAt(0)}.</Text>}
            </View>
        </TouchableOpacity>
     );
}
 
export default ChatPreview;