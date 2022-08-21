import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";

import MapSection from "./Map"
import RequesterList from "./RequesterList";


const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);

    const [userData, setUserData] = useState(null)
    const [loadingData, setLoadingData] = useState(userData == null)
    
    const [postData, setPostData] = useState(null)
    const [alreadyRequested, setAlreadyResquested] = useState(false)
    

    const allowRequest = useLocation().pathname.includes("visits")

    

    useEffect(() => {
        client.auth.onAuthStateChanged(user => {
            if (user) {
                client.getDocument(COLLECTIONS.REGULAR_USERS, user.uid)
                    .then(snapshot => {
                        setUserData(snapshot.data())
                    })
                
            }
        })
        client.getDocument(COLLECTIONS.AVAILABLE_VISITS,id)
            .then(snapshot => {
                setPostData(snapshot.data())
            })
    }, [])

    

    useEffect(() => {
        setLoadingData(postData == null || userData == null)
    }, [postData,userData])

    return ( 
        <div className="post-details">
            <h2>Post Details</h2>
            {loadingData && <div>Loading...</div>}
            {!loadingData &&
            <div id="information">
                <div id="date">{postData.dateVisit}</div>
                <div style={{ display: 'flex', maxWidth: '90%' }}>
                    <div id="street">{postData.street}</div>
                    {!loadingData && 
                    allowRequest && console.log(userData.myVisitRequests)}
                    { console.log(id)}
                    {!loadingData && 
                    allowRequest && 
                    (!userData.myVisitRequests.includes(id) ? <Link to={`request`}>Send Request</Link> : <Link to={'viewRequest'}>View Request</Link>)}
                </div>
                
                <div id="country">{postData.npa} {postData.city}, {postData.country}</div>
            </div>}
            {!loadingData && <MapSection location={[postData.fullAdress,parseFloat(postData.lat),parseFloat(postData.lng)]} zoomLevel={16} />}

            
            <RequesterList postID={id} />
        </div>
     );
}
 
export default PostPage;