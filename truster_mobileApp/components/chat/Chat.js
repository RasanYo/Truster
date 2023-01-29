import { useContext, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context";
import Footer from "../Footer";
import Header from "../Header";
import MessageList from "./MessageList";
import defaultPic from "../../assets/pictures/no-profile-pic.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Chat = ({
    navigation,
    route
}) => {

    const { receiverID, postID } = route.params
    const {user} = useContext(UserContext)
    const [receiver, setReceiver] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [chatData, setChatData] = useState(null)
    const [message, setMessage] = useState(null)
    const [post, setPost] = useState(null)

    const getChat = () => {
        user.getPost(postID).then(p => setPost(p))
        user
            .getChatWith(receiverID, postID).then(data => {
                if (!data) {
                    console.log("OPENING NEW CHAT WITH UID:", receiverID)
                    return user.openChat(receiverID, postID).then(() => {return true})
                } else {
                    setChatData(data)
                    console.log("CHAT_DATA", chatData)
                    return false
                }
                
            })
            .then(openedChat => {
                if (openedChat) {
                    user.getChatWith(receiverID, postID).then(data => {
                        setChatData(data)
                        console.log("CHAT_DATA", chatData)
                    })
                }
            })
            .catch(err => {
                console.log("ERROR: ", err.message)

                console.log("OPENING NEW CHAT WITH UID:", receiverID)
                user.openChat(receiverID, postID).then(() => {
                    getChatWith(receiverID, postID).then(data => {
                        setChatData(data)
                        console.log("CHAT_DATA", chatData)
                    })
                })
            })
            
    }

    useEffect(() => {
        getChat()
        user.getUser(receiverID).then(data => {
            setReceiver(data)
            console.log("CHAT WITH ", receiver.firstName, receiver.lastName)
        })
        user.getProfilePictureURL(receiverID).then(url => {
            setProfilePic(url)
        })
    }, [])

    const handleSendMessage = () => {
        user.sendMessage(receiverID, postID, message)
            .then(() => {
                getChat()
                setMessage(null)
            })
            .catch(err => console.error("ERROR IN SEND MESSAGE:", err.message))
    }

    return ( 
        <View style={{flex: 1}}>
            <Header 
                style={{
                    paddingTop: 20, 
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <Text 
                    onPress={() => navigation.pop()}
                    style={{marginLeft: 0, flex: 1}}
                >
                    Go back
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 2}}>  
                    <Image 
                        style={{height: 40, width: 40, borderRadius: 50, marginRight: 10,}} 
                        source={profilePic ? {uri: profilePic} : defaultPic}
                    />
                    {receiver && <Text style={{fontSize: 18}}>{receiver.firstName} {receiver.lastName.charAt(0)}.</Text>}
                </View>
                <TouchableOpacity 
                    onPress={post ? () => navigation.navigate('PostPreview', {post: post, isJusPreview: true}) : () => {}}
                    style={{
                        flex: 1
                    }}
                >
                    <Text>See Location</Text>
                </TouchableOpacity>
                
            </Header>
            <View style={{marginTop: 10}}>
                {chatData ? 
                    <MessageList messages={chatData.messages}/> :
                    <Text>Write a message to open the chat</Text>}
            </View>
            
            <KeyboardAwareScrollView nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1 }}>
            <Footer 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:"space-between",

                }}
            >
                <TextInput 
                    placeholder="Write a message here" 
                    value={message} 
                    onChangeText={text => setMessage(text)} 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    multiline={true}
                    style={{
                        flex: 5,
                        borderStyle: 'solid',
                        borderRadius: 50,
                        borderColor: '#00D394',
                        minHeight: 40,
                        paddingHorizontal: 10,
                        marginRight: 5
                    }}
                />
                <TouchableOpacity 
                    onPress={handleSendMessage} 
                    style={{
                        backgroundColor: "#00D394",
                        minHeight: 40,
                        flex: 1,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={{color: "white",}}>Send</Text>
                </TouchableOpacity>

            </Footer>
            </KeyboardAwareScrollView>
        </View>
     );
}
 
export default Chat;