import { useEffect } from 'react';
import { View } from 'react-native';
import RequesterList from '../components/requester_list/RequesterList';


const Requests = ({
  route, navigation
}) => {

  const {requesterIDs, postID} = route.params;

  useEffect(() => {
    console.log('REQUESTER IDs', requesterIDs);
    console.log('POST ID', postID);
  }, []);

  const handleChat = (receiverID) => {
    console.log('REDIRECTING TO CHAT');
    navigation.navigate('Messages')
    navigation.navigate('Chat', {receiverID: receiverID, postID: postID});
  };

  return ( 
    <View>
      <RequesterList requesterIDs={requesterIDs} handleChat={handleChat} postID={postID}/>
    </View>
  );
};
 
export default Requests;