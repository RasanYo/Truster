import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import RequesterList from '../components/requester_list/RequesterList';
import { COLLECTIONS } from '../Constants';
import { UserContext } from '../context';


const Requests = ({
  route, navigation
}) => {

  const {requesterIDs, postID} = route.params;
  // const {user} = useContext(UserContext);
  // const [requesterIds, setRequesterIds] = useState(null);

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(user.db, COLLECTIONS.AVAILABLE_VISITS,postID), (doc) => {
  //     console.log('Current data: ', doc.data().requesters);
  //     setRequesterIds(doc.data().requesters);
  //   });
  // }, []);

  

  useEffect(() => {
    console.log('REQUESTER IDs', requesterIDs);
    console.log('POST ID', postID);
  }, []);

  const handleChat = (receiverID) => {
    console.log('REDIRECTING TO CHAT');
    navigation.navigate('Messages');
    navigation.navigate('Chat', {receiverID: receiverID, postID: postID});
  };

  return ( 
    <View>
      {requesterIDs && <RequesterList requesterIDs={requesterIDs} handleChat={handleChat} postID={postID}/>}
    </View>
  );
};
 
export default Requests;