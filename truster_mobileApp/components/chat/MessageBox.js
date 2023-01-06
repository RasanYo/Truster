import { View } from "react-native";

const MessageBox = ({
    time,
    message
}) => {
    return ( 
        <View>
            <Text>{message}</Text>
            <Text>{time}</Text>
        </View>
     );
}
 
export default MessageBox;