import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UserContext } from '../context';
import { Post } from '../objects/Post';
import defaultPic from '../assets/pictures/no-profile-pic.png';
import { AntDesign } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const PostScreen = (props) => {

  const navigation = props.navigation;
  const {user} = useContext(UserContext);
  const {post, isJustPreview} = props.route.params;
  const [isOwnPost, setIsOwnPost] = useState(false);

  const [poster, setPoster] = useState({
    firstName: 'Trustable',
    lastName: 'Trustee'
  });
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (isJustPreview) {
      if(user.isLoggedIn()){
        user.getPersonalInformation().then(snapshot => {
          setUserData(snapshot.data());
        })
          .catch(err => {
            console.log('ERROR: ', err);
          });
      }else {
        setUserData({
          firstName : 'You',
          lastName : 'X'
        });
      }
    } else {
      user.getUser(post.creatorUID).then(data => {
        setPoster(data);
        console.log('POSTER ID', data.uid);
        console.log('YOUR ID', user.getUID());
        setIsOwnPost(user.getUID() === data.uid);
        console.log('CAN MODIFY ?', isOwnPost);

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
      const p = new Post(post.address, post.timeframe, post.description, user.getUID());
      user.post(p).then(() => navigation.navigate('Menu')).then(() => console.log('Successfully posted'));
    }
  };

  const handleChat = () => {
    navigation.navigate('Chat', {receiverID: poster.uid, postID: post.id});
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
                        source={profilePic ? {uri: profilePic} : defaultPic}
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
                <TouchableWithoutFeedback onPress={handleChat}>
                  <Text>Chat</Text>
                </TouchableWithoutFeedback>
                <View style={styles.infoContainer}>
                  <Text style={{fontSize: 24}}>{post.address.city}</Text>
                  <Text style={{fontSize: 18, color: '#bfbfbfbf', marginBottom: 15}}>{post.address.npa} {post.address.city}, {post.address.country}</Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>{post.timeframe.start}  -  {post.timeframe.end}</Text>
                  <Text style={{fontSize: 20, marginBottom: 10}}>Description</Text>
                  <Text style={{marginBottom: 20}}>{post.description || 'No description'}</Text>
                  {/* <Text style={{fontSize: 22}}>Send Request</Text> */}
                  {/* {!isJustPreview && <TextInput placeholder="Additional information" style={styles.sendRequestText} multiline={true}></TextInput>} */}
                        
                </View>

                <TouchableWithoutFeedback onPress={handleRequests}>
                  <Text>Requesters</Text>
                </TouchableWithoutFeedback>
                    
                {!isOwnPost && <View style={{margin:20,opacity: isJustPreview ? 0.5 : 1}}>
                  <Text style={{fontSize:20}}>Send Request</Text>
                  {isJustPreview ? <Text style={styles.sendRequestText}>Additional information</Text> : <TextInput placeholder="Additional information" style={styles.sendRequestText} multiline={true}></TextInput>}
                </View>}
                    
                    
                    
                    
                    
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
      <Text style={styles.footerEraseAll} onPress={() => props.navigation.pop()}>
                Go back
      </Text>
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