import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { Text, View } from "react-native";
import { UserContext } from "../../context";

const MessageBox = ({
    msg
}) => {

    const {user} = useContext(UserContext)

    const toTimeString = (seconds, nanoseconds) => {
        let date = new Timestamp(seconds, nanoseconds).toDate()
        let today = Timestamp.now().toDate()

        var time = `${date.getHours()}:${date.getMinutes()}`
        if (date.getDate() != today.getDate()) {
            time = `${time} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        }
        return time
    }

    return ( 
        <View style={{
            marginLeft: user.getUID() == msg.from ? 'auto' : 0
        }}>
            <Text>{msg.message}</Text>
            <Text>{toTimeString(...Object.values(msg.sentAt))}</Text>
        </View>
     );
}
 
export default MessageBox;