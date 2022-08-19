import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";
import RolldownItem from "./RolldownItem";
import MapSection from "./Map"
import { onSnapshot } from "firebase/firestore";


const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);
    const [location, setLocation] = useState("")
    const navigate = useNavigate()

    const [postData, setPostData] = useState(null)
    const [loadingData, setLoadingData] = useState(postData == null)

    const [requests, setRequests] = useState(null)
    const [loadingRequests, setLoadingRequests] = useState(requests == null)

    const [unsubRealTimeRequests, setUnsubRealTimeRequests] = useState(null)
    const allowRequest = useLocation().pathname.includes("visits")

    useEffect(() => {
        client.getDocument(COLLECTIONS.AVAILABLE_VISITS,id)
            .then(snapshot => {
                setPostData(snapshot.data())
            })
    }, [])

    

    useEffect(() => {
        setLoadingData(postData == null)
        setLoadingRequests(requests == null)
        if (postData && !requests && !allowRequest) {
            console.log("Fetching requests")
            client.getCollectionData(`${COLLECTIONS.AVAILABLE_VISITS}/${id}/requests`)
                .then(reqs => {
                    setRequests(reqs)
                })
        }
    }, [postData, requests])

    return ( 
        <div className="post-details">
            <h2>Post Details</h2>
            {loadingData && <div>Loading...</div>}
            {!loadingData &&
            <div id="information">
                <div id="date">{postData.dateVisit}</div>
                <div id="street">{postData.street}</div>
                <div id="country">{postData.npa} {postData.city}, {postData.country}</div>
            </div>}
        
            {!loadingData && <MapSection location={[postData.fullAdress,parseFloat(postData.lat),parseFloat(postData.lng)]} zoomLevel={15} id="PostPage"/>}
            
            {!loadingData && allowRequest && <Link to={`request`}>Send Request</Link>}
            {!loadingRequests && !allowRequest && 
            <div className="rolldown-list">
                {requests.map((request, index) => {
                    return <RolldownItem 
                        key={index}
                        preview={<div>{request.createdBy}</div>}
                        body={<div>
                            <h4>{request.message}</h4>
                            {!postData.visitor && <button onClick={e => {
                                client.acceptVisitRequest(id, request.createdBy)
                            }}>Accept request</button>}
                            {postData.visitor && 
                            postData.visitor == request.createdBy && 
                            <button onClick={e => {
                                client.cancelVisit(id, request.createdBy)
                            }}>Cancel visit</button>}
                        </div>}
                    />
            })}
            </div>}
        </div>
     );
}
 
export default PostPage;