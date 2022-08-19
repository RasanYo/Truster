import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";
import RolldownItem from "./RolldownItem";

const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);
    // const location = useLocation()
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
            {!loadingData && allowRequest && <Link to={`request`}>Send Request</Link>}
            <RolldownItem/>
            
        </div>
     );
}
 
export default PostPage;