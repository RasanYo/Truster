import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";
import MapSection from "./Map"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";

const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);
    const [location, setLocation] = useState("")
    const navigate = useNavigate()

    const [postData, setPostData] = useState(null)
    const [loadingData, setLoadingData] = useState(postData == null)
    const allowRequest = useLocation().pathname.includes("visits")

    useEffect(() => {
        client.getDocument(COLLECTIONS.AVAILABLE_VISITS,id).then(snapshot => {
            setPostData(snapshot.data())
        })
    }, [])

    

    useEffect(() => {
        if (postData) {
            // console.log(postData.createdBy, client.currentUserUID)
            // if (postData.createdBy == client.currentUserUID && location.pathname.includes("visits")) {
            //     console.log("NAVIGATE TO MYPOSTS")
            //     navigate(`../myposts/${id}`)
            // } else if (postData.createdBy != client.currentUserUID && location.pathname.includes("myposts")) {
            //     console.log("NAVIGATE TO VISITS")
            //     navigate(`../visits/${id}`)
            // }
            setLoadingData(false)
        } 
        else {
            setLoadingData(true)
        }
    }, [postData])

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
            
        </div>
     );
}
 
export default PostPage;