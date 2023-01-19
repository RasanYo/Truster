import { useContext, useState } from "react"
import { Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { UserContext } from "../../context"

const RequesterContainer = ({
    requesterID,
    acceptRequest=() => {},
    rejectRequest=() => {}
}) => {

    const {user} = useContext(UserContext)
    const [profilePic, setProfilePic] = useState(null)
    const [requester, setRequester] = useState()

    useEffect(() => {
        user.getProfilePictureURL(requesterID).then(url => {
            setProfilePic(url)
        })
        user.getUser(requesterID).then(data => {
            setRequester(data)
        })
    }, [])

    return ( 
        <View>
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <Image 
                    style={{height: 40, width: 40, borderRadius: 50, marginRight: 10}} 
                    source={profilePic ? {uri: profilePic} : defaultPic}
                />
                {receiver && <Text>{requester.firstName} {requester.lastName.charAt(0)}.</Text>}
            </View>
            <View>
                <TouchableOpacity onPress={acceptRequest}>
                    <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={rejectRequest}>
                    <Text>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default RequesterContainer;