import { useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { UserContext } from "../../context"
import { useEffect } from "react";
import UserPreview from "../UserPreview";
import { AntDesign } from "@expo/vector-icons";

const RequesterContainer = ({
    requesterID,
    handleChat,
    acceptRequest=(r) => {},
    rejectRequest=(r) => {}
}) => {

    const {user} = useContext(UserContext)

    const [poster, setPoster] = useState({
        firstName: "Trustable",
        lastName: "Trustee"
    })

    useEffect(() => {
        console.log("CHECK1")
        user.getUser(requesterID).then(data => {
            setPoster(data)
        })
        console.log("CHECK2")
    }, [])


    return ( 
        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#d0d0d0'}}>
            <TouchableOpacity onPress={() => handleChat(requesterID)} style={{flex: 2}}>
                <View>
                    <UserPreview 
                        receiver={poster} 
                        profilePic={null} 
                        style={{borderBottomWidth: 0, marginLeft: 20}}/>
                </View>
            </TouchableOpacity>
            
            <View 
                style={{
                    flex: 1, 
                    flexDirection: 'row', 
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={() => acceptRequest(requesterID)} style={{marginRight: 20}}>
                    <AntDesign name="checksquare" size={40} color="#00D394"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rejectRequest(requesterID)}>
                    <AntDesign name="closesquare" size={40} color="red"/>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default RequesterContainer;