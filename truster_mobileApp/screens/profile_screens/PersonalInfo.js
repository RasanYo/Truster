import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { UserContext } from "../../context";

const PersonalInfo = () => {

    const {user} = useContext(UserContext)
    const [userData, setUserData] = useState()

    const toast= useToast()

    useEffect(() => {
        user.getPersonalInformation().then(snapshot => {
            setUserData(snapshot.data())
        })
    }, [])


    const timeFormat = (n) => {
        return n < 10 ? `0${n}` : n
    }

    const toDate = (dateObject) => {
        const nanoseconds = dateObject.nanoseconds
        const seconds = dateObject.seconds
        let date = new Timestamp(seconds, nanoseconds).toDate()
        return `${timeFormat(date.getDate())}/${timeFormat(date.getMonth()+1)}/${date.getFullYear()}`
    }

    const handleModify = () => {
        user.updatePersonalInformation(userData).then(() => {
            return user.getPersonalInformation()
        }).then(snapshot => {
            setUserData(snapshot.data())
            toast.show("Update successful")
        })
    }

    return ( 
        <View>
            {userData && 
            <ScrollView style={{
                paddingHorizontal: 30
            }}>
                <InfoSpace title="First Name" value={userData.firstName} modifyData={(val) => setUserData({...userData, firstName: val})}/>
                <InfoSpace title="Last Name" value={userData.lastName} modifyData={(val) => setUserData({...userData, lastName: val})}/>
                <InfoSpace title="Email address" value={userData.email}/>
                <InfoSpace title="Address" value={userData.address}/>
                <InfoSpace title="Member since" value={toDate(userData.createdAt)}/>
                <InfoSpace title="About Me" value={userData.aboutMe} modifyData={(val) => setUserData({...userData, aboutMe: val})}/>
                <TouchableOpacity 
                    onPress={handleModify}
                    style={{
                        backgroundColor: "#00D394",
                        borderRadius: 10,
                        alignSelf: 'flex-start',
                        padding: 5,
                        marginTop: 20,
                        marginLeft: 'auto'
                    }}
                >
                    <Text style={{color: 'white', fontSize: 18}}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>}
        </View>
        
     );
}
 
export default PersonalInfo;

const InfoSpace = ({
    title,
    value,
    modifyData=null
}) => {
    const toast = useToast()

    const noModifyToast = () => {
        toast.show(`Can't modify ${title}`)
    }

    return (
        <View style={{
            marginBottom: 20,
            borderBottomWidth: 1,
            borderColor: '#dfdfdf',
            paddingVertical: 5
        }}>
            <Text style={{fontSize: 12, color: "#00D394", marginBottom: 5}}>{title}</Text>
            <TouchableWithoutFeedback onPress={modifyData ? () => {} : noModifyToast}>
                {modifyData ? 
                <TextInput 
                    style={{fontSize: 20, marginLeft: 15}}
                    value={value}
                    onChangeText={modifyData}
                    // onChange={modifyData}
                /> :
                <Text style={{fontSize: 20, marginLeft: 15}}>{value}</Text>}
            </TouchableWithoutFeedback>
            
        </View>
    )
}