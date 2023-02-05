import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UserContext } from '../context';
import { Post } from '../objects/Post';
import defaultPic from '../assets/pictures/no-profile-pic.png';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserCard from './UserCard';
import { doc, onSnapshot } from 'firebase/firestore';
import { COLLECTIONS } from '../Constants';


const PostScreen = (props) => {

  const navigation = props.navigation;
  const {user} = useContext(UserContext);
  const {post, isJustPreview} = props.route.params;
  const [isOwnPost, setIsOwnPost] = useState(false);

  const [postData, setPostData] = useState(post);

  useEffect(() => {
    if(!isJustPreview) {
      const unsub = onSnapshot(doc(user.db, COLLECTIONS.AVAILABLE_VISITS, post.id), (doc) => {
        consoloe.log('isJustPreview : ', isJustPreview);
        
        console.log('Current data in POST SCREEN: ', doc.data());
        setPostData(doc.data());
      });
    }
    
  }, []);

  const [poster, setPoster] = useState({
    firstName: 'Trustable',
    lastName: 'Trustee'
  });

  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log('VISITOR', post.visitorID);
    if (isJustPreview) {
      if(user.isLoggedIn()){
        user.getPersonalInformation().then(snapshot => {
          var aux = snapshot.data();
          console.log('YOYOYOYOYOYOYOYO : ' + aux.firstName);
          setPoster({
            firstName : aux.firstName,
            lastName : aux.lastName
          });
        })
          .catch(err => {
            console.log('ERROR: ', err);
          });
      }else {
        setPoster({
          firstName : 'You',
          lastName : 'X'
        });
      }
    } else {
      user.getUser(post.creatorUID).then(data => {
        setPoster(data);
        console.log('POSTER ID', data.uid);
        console.log('YOUR ID', user.getUID());
        let bool = user.getUID() === data.uid;
        console.log('CAN MODIFY ?', bool);
        setIsOwnPost(bool);  

      });
      user.getProfilePictureURL(post.creatorUID).then(url => {
        setProfilePic(url);
      })
        .catch(err => console.log(err));
    }
        
  }, []);

  const coordinate = {
    latitude : post.address.lat,
    longitude : post.address.lng
  }; 

  const onRequest = e => {
    if(!user.isLoggedIn()){
      navigation.navigate('LoginMenu');
    }else{
      console.log('connecté');
      user.requestVisit(post.id).then(() => {
        navigation.pop();
        console.log('Successfully requested');
      });
    }
        
  };

  const onPost = () => {
    if(!user.isLoggedIn()){
      navigation.navigate('LoginMenu');
    }else{
      console.log('connecté');
      const p = new Post(post.address, post.timeframe, post.price, post.description, user.getUID(), );
      user.post(p).then(() => navigation.navigate('Menu')).then(() => console.log('Successfully posted'));
    }
  };

  const handleChat = (uid) => {
    navigation.navigate('Messages'); 
    navigation.navigate('Chat', {receiverID: uid, postID: post.id});
  };

  const handleRequests = () => {
    navigation.navigate('Requesters', {requesterIDs: post.requesters, postID: post.id});
  };

  return ( 
    <View style={{flex: 1}}>
      {poster && 
            <KeyboardAvoidingView>

              <KeyboardAwareScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.container} showsVerticalScrollIndicator={false}>

                <View>
                  <MapView style={styles.map} initialRegion={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                  }}
                  scrollEnabled={false}
                  rotateEnabled={false}
                  zoomEnabled={false}                        
                  >
                    <Marker
                      // key={index}
                      coordinate={coordinate}
                      title={post.address.fullAddress}
                      description={'marker.description'}
                      pinColor="#29ECB1"
                    />
                  </MapView>
                  <View style={styles.posterContainer}>
                    <View>
                      <Image 
                        style={{height: 40, width: 40, borderRadius: 50, marginRight: 10}} 
                        // source={profilePic ? {uri: profilePic} : defaultPic}
                        source={defaultPic}
                      />
                    </View>
                    <View>
                      <Text style={{color: '#0400007c', fontSize: 12}}>Poster</Text>
                      <Text style={{fontSize: 18, marginRight: 15}}>{poster.firstName} {poster.lastName.charAt(0)}.</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <AntDesign name="staro" size={24} color="yellow" />
                      <AntDesign name="staro" size={24} color="yellow" />
                      <AntDesign name="staro" size={24} color="yellow" />
                      <AntDesign name="staro" size={24} color="yellow" />
                      <AntDesign name="staro" size={24} color="yellow" />
                    </View>
                  </View>                                                             
                </View>
                {/* <TouchableWithoutFeedback onPress={handleChat}>
                  <Text>Chat</Text>
                </TouchableWithoutFeedback> */}
                <View style={styles.infoContainer}>
                  <Text style={{fontSize: 24}}>{post.address.city}</Text>
                  <Text style={{fontSize: 18, color: '#bfbfbfbf', marginBottom: 15}}>{post.address.npa} {post.address.city}, {post.address.country}</Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>{post.timeframe.start}  -  {post.timeframe.end}</Text>
                  <Text style={{fontSize: 16, marginBottom: 20}}>Compensation: <Text style={{fontSize: 20, fontWeight: 'bold'}}>{post.price} €</Text></Text>
                  <Text style={{fontSize: 20, marginBottom: 10}}>Description</Text>
                  <Text style={{marginBottom: 20}}>{post.description || 'No description'}</Text>
                  {/* <Text style={{fontSize: 22}}>Send Request</Text> */}
                  {/* {!isJustPreview && <TextInput placeholder="Additional information" style={styles.sendRequestText} multiline={true}></TextInput>} */}
                        
                </View>

                {isOwnPost && 
                <TouchableOpacity 
                  onPress={post.visitorID ? () => handleChat(post.visitorID) : handleRequests}
                  style={{
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#d0d0d0',
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{fontSize: 14}}>Visitor (tap to chat)</Text>
                  {postData && postData.visitorID && <UserCard uid={postData.visitorID} style={{borderBottomWidth: 0}}/>}
                  {postData && !postData.visitorID && <Text>No visitor yet</Text>}
                </TouchableOpacity>}

                {isOwnPost && 
                <TouchableOpacity 
                  onPress={handleRequests}
                  style={{
                    marginTop: 5,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#d0d0d0',
                    padding: 20,
                    flexDirection: 'row'
                  }}
                >
                  <Text style={{fontSize: 20,marginBottom:150}}>Requesters</Text>
                  <Ionicons name="caret-forward-circle-outline" size={30} color="black" style={{marginLeft: 'auto'}}/>
                </TouchableOpacity>}
                    
                {/* {!isOwnPost && <View style={{margin:20,opacity: isJustPreview ? 0.5 : 1}}>
                  <Text style={{fontSize:20}}>Send Request</Text>
                  {isJustPreview ? <Text style={styles.sendRequestText}>Additional information</Text> : <TextInput placeholder="Additional information" style={styles.sendRequestText} multiline={true}></TextInput>}
                </View>} */}
                    
                    
                    
                    
                    
                {/* </ScrollView> */}
              </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
      }
      <Footer navigation={navigation} onSubmit={isJustPreview ? onPost : onRequest} isJustPreview={isJustPreview} isOwnPost={isOwnPost}></Footer>
    </View>
  );
};
 
export default PostScreen;

function Footer(props){
  return(
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => props.navigation.pop()}>
        <Text style={styles.footerEraseAll} >
                Go back
        </Text>
      </TouchableOpacity>
      
      {!props.isOwnPost && <TouchableWithoutFeedback onPress={props.onSubmit}>
        <View style={styles.footerPreview} >
          {props.isJustPreview && <MaterialIcons name="add-to-photos" size={24} color="black" />}
          <Text style={{fontSize: 20,marginLeft:5, justifyContent: 'center'}}>{props.isJustPreview? 'Post' : 'Request'}<AntDesign name="right" size={20} color="black"/></Text>
        </View>
      </TouchableWithoutFeedback>}
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#EBEBEB',
    paddingBottom: 70
  },

  map: {
    width: '100%',
    height: 400,
  },

  posterContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#AEF4DF',
    marginHorizontal: 50,
    position: 'relative',
    top: -30,

    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },


  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 0
  },
  footer : {
    backgroundColor : 'white',
    flexDirection : 'row',
        
    position:'absolute',
    bottom:0,
    width: '100%',        
    height: 70,

    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent:'space-between',
    alignItems:'center',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  footerPreview : {
    flexDirection:'row', 
    backgroundColor:'#FFCB66',
    padding:10,
    borderRadius:10,
    marginRight:20,
  },

  footerEraseAll : {
    fontSize: 20, 
    textDecorationLine:'underline',

  },
  sendRequestText : {
    backgroundColor:'#E0DFDF',
    borderRadius:10,
    marginTop:10,
    height:200,
    borderWidth:1,
    textAlignVertical: 'top',
    padding:8,
    marginBottom:100
  },
});