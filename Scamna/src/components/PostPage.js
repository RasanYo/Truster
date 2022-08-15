import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DBClientContext } from "../App";

const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);
    const previousPostData = useRef(null)

    const [postData, setPostData] = useState(null)
    const [loadingData, setLoadingData] = useState(postData == null)


    useEffect(() => {
        client.getDocument("posts/notVisited/posts",id).then(snapshot => {
            setPostData(snapshot.data())
        })
    }, [])
    

    useEffect(() => {
        if (postData) setLoadingData(false)
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
            
        </div>
     );
}
 
export default PostPage;