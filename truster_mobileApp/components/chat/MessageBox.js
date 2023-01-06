import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { Text, View } from "react-native";
import { UserContext } from "../../context";

const MessageBox = ({
    msg
}) => {

    const {user} = useContext(UserContext)

    const timeFormat = (n) => {
        return n < 10 ? `0${n}` : n
    }

    const toTimeString = (seconds, nanoseconds) => {
        let date = new Timestamp(seconds, nanoseconds).toDate()
        let today = Timestamp.now().toDate()

        var time = `${timeFormat(date.getHours())}:${timeFormat(date.getMinutes())}`
        if (date.getDate() != today.getDate()) {
            time = `${time} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        }
        return time
    }

    return ( 
        <View style={{
            marginLeft: user.getUID() == msg.from ? 'auto' : 10,
            marginRight:  user.getUID() != msg.from ? 'auto' : 10,
            marginBottom: 5,
            padding: 10,
            backgroundColor: "#Dcdcdc",
            borderRadius: 10
        }}>
            <Text 
                style={{
                    fontSize: 10,
                    marginLeft: user.getUID() == msg.from ? 'auto' : 0,
                    marginRight:  user.getUID() != msg.from ? 'auto' : 0,
                }}
            >
                {toTimeString(...Object.values(msg.sentAt))}
            </Text>
            <Text>{msg.message}</Text>
            
        </View>
     );
}
 
export default MessageBox;