import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FlatList, Text } from 'react-native';
import { UserContext } from '../../context';
import RequesterContainer from './RequesterContainer';

const RequesterList = ({
  requesterIDs,
  handleChat,
  postID
}) => {

  const [ids, setIds] = useState(requesterIDs);

  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log('CHECK LIST');
  }, []);

  const removeRequest = (requesterID) => {
    setIds(ids.filter(id => id != requesterID));
  };

  const acceptRequest = (requesterID) => {
    user.acceptRequest(postID, requesterID).then(() => {
      removeRequest(requesterID);
      console.log('ACCEPTED REQUEST');
    });
  };

  const rejectRequest = (requesterID) => {
    user.rejectRequest(postID, requesterID).then(() => {
      removeRequest(requesterID);
      console.log('REJECTED REQUEST');
    });
  };

  return ( 
    <>
      {!ids.length && <Text style={{alignSelf: 'center', marginTop: 10}}>You received no requests yet</Text>}
      <FlatList 
        data={ids}
        renderItem={({ item }) => (
          <RequesterContainer 
            requesterID={item}
            handleChat={handleChat}
            acceptRequest={acceptRequest}
            rejectRequest={rejectRequest}
          />
        )}
      />
    </>
  );
};
 
export default RequesterList;