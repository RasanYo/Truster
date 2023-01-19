import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableWithoutFeedback, View } from "react-native";
import ChatPreview from "../components/chat/ChatPreview";
import Header from "../components/Header";
import { UserContext } from "../context";

const ChatPage = ({navigation}) => {

    const {user} = useContext(UserContext)
    const [chatInfos, setChatInfos] = useState()

    useEffect(() => {
        user.getAllChats().then(data => {
            setChatInfos(data)
            // console.log("CHAT_PAGE DATA", data)
        })
    }, [])

    return ( 
        <View>
            <Header style={{
                paddingTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <Text style={{fontSize: 20}}>My Chats</Text>
            </Header>
            {chatInfos && chatInfos.length ? 
                <FlatList 
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 5
                    }}
                    data={chatInfos}
                    renderItem={({ item }) => (
                        <ChatPreview id={item.id} receiverID={item.receiverID} navigation={navigation}/>
                    )}
                /> :
                <Text>No open chats yet</Text>
            }
        </View>
    );
}
 
export default ChatPage;