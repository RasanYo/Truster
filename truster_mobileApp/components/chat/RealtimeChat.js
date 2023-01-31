import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../../context';
import Footer from '../Footer';
import Header from '../Header';
import MessageList from './MessageList';
import defaultPic from '../../assets/pictures/no-profile-pic.png';
import { Timestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from 'react-native-toast-notifications';

const RealtimeChat = ({
  navigation,
  route
}) => {

  const {user} = useContext(UserContext);
  const { receiverID, postID } = route.params;

  const [message, setMessage] = useState(null);
  const [post, setPost] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [openNewChat, setOpenNewChat] = useState(false);
  const [messages, setMessages] = useState(null);

  const toast = useToast();
  

  useEffect(() => {
    if (openNewChat) {
      console.log('OPENING NEW REALTIME CHAT');
      user.openRealtimeChat(receiverID, postID);
    }
  }, [openNewChat]);

  useEffect(() => {
    user.getRealtimeChatListener(receiverID, postID, (snapshot) => {
      let msg = [];
      let docs = snapshot.docs;
          
      if (!docs.length) setOpenNewChat(true);
      else {
        for (let doc in snapshot.docs) {
          let data = snapshot.docs[doc].data();
          msg.push(data);
        }
        msg.sort((a, b) => {
          let timeA = new Timestamp(a.sentAt.seconds, a.sentAt.nanoseconds).toDate();
          let timeB = new Timestamp(b.sentAt.seconds, b.sentAt.nanoseconds).toDate();
          if (timeA < timeB) return -1;
          else return 1;
        });
              
        setMessages(msg);
      }
          
    });
    user.getPost(postID).then(p => setPost(p));
    user.getUser(receiverID).then(data => {
      setReceiver(data);
      console.log('CHAT WITH ', receiver.firstName, receiver.lastName);
    });
    user.getProfilePictureURL(receiverID).then(url => {
      setProfilePic(url);
    });
  }, []);

  const handleSendMessage = () => {
    if (message) {
      user.sendRealtimeMessage(receiverID, postID, message).then(() => {
        console.log('Sent message');
        setMessage(null);
      });
    } else {
      toast.show('Cannot send empty message', {type: 'normal', duration: 1000, placement: 'top'});
    }
    
  };

  return ( 
    <View style={{flex: 1}}>
      <Header 
        style={{
          paddingTop: 20, 
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        {/* <Text 
          onPress={() => navigation.pop()}
          style={{marginLeft: 0, flex: 1}}
        >
                    Go back
        </Text> */}
        <TouchableOpacity onPress={() => navigation.pop()} style={{marginLeft: 0, flex: 1}}>
          <Ionicons name="caret-back-circle-outline" size={30} color="black" 
          />
        </TouchableOpacity>
        
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
      <ScrollView style={{paddingTop: 10, marginBottom: 80}}>
        {messages ? 
          <MessageList messages={messages}/> :
          <Text>Write a message to open the chat</Text>}
      </ScrollView>
            
      {/* <KeyboardAwareScrollView nestedScrollEnabled={true}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flexGrow: 1 }}> */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'position' : null} enabled>
        <Footer 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',

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
              backgroundColor: '#00D394',
              minHeight: 40,
              flex: 1,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </Footer>
        {/* </KeyboardAwareScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
};
 
export default RealtimeChat;