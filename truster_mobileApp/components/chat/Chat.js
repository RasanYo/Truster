import { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context";
import MessageList from "./MessageList";

const Chat = ({
    navigation,
    route
}) => {

    const receiverID = route.params.receiverID
    const {user} = useContext(UserContext)
    const [chatData, setChatData] = useState(null)
    const [message, setMessage] = useState(null)

    const getChat = () => {
        user.getChatWith(receiverID).then(data => {
            setChatData(data)
            console.log("CHAT_DATA", chatData)
        })
    }

    useEffect(() => {
        getChat()
    }, [])

    const handleSendMessage = () => {
        user.sendMessage(receiverID, message)
            .then(() => {
                getChat()
                setMessage(null)
            })
    }

    return ( 
        <View>
            <View>
                <Text>HEADER</Text>
            </View>
            <View>
                {chatData.messages.length ? 
                    <MessageList messages={chatData.messages}/> :
                    <Text>Write a message to open the chat</Text>}
            </View>
            
            <View>
                <TextInput 
                    placeholder="Write a message here" 
                    value={message} 
                    onChangeText={text => setMessage(text)} 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    onChange={() => {setIsLoggingIn(false);setIsWrongPassword(false) }} 
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default Chat;