import { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context";
import MessageList from "./MessageList";

const Chat = ({
    navigation,
    route
}) => {

    const { receiverID } = route.params
    const {user} = useContext(UserContext)
    const [chatData, setChatData] = useState(null)
    const [message, setMessage] = useState(null)

    const getChat = () => {
        user
            .getChatWith(receiverID).then(data => {
                if (!data) {
                    console.log("OPENING NEW CHAT WITH UID:", receiverID)
                    user.openChat(receiverID).then(() => {return true})
                } else {
                    setChatData(data)
                    console.log("CHAT_DATA", chatData)
                }
                
            })
            .then(openedChat => {
                if (openedChat) {
                    user.getChatWith(receiverID).then(data => {
                        setChatData(data)
                        console.log("CHAT_DATA", chatData)
                    })
                }
            })
            .catch(err => {
                console.log("ERROR: ", err.message)
                // console.log("OPENING NEW CHAT WITH UID:", receiverID)
                // user.openChat(receiverID).then(() => {
                //     getChatWith(receiverID).then(data => {
                //         setChatData(data)
                //         console.log("CHAT_DATA", chatData)
                //     })
                // })
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
            .catch(err => console.error("ERROR IN SEND MESSAGE:", err.message))
    }

    return ( 
        <View>
            <View>
                <Text>HEADER</Text>
            </View>
            <View>
                {chatData ? 
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
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default Chat;