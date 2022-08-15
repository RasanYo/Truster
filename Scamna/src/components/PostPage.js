import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DBClientContext } from "../App";

const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);
    const previousPostData = useRef(null)

    const [postData, setPostData] = useState(null)
    const [loadingData, setLoadingData] = useState(postData == null)

    if(postData != previousPostData){
        client.getDocument("posts/notVisited/posts",id).then(snapshot => {
            const data = snapshot.data()
            setPostData(data)
            previousPostData.current = data
        })
    }
    

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
            <div id="information">{!loadingData && <div id="date">{postData.dateVisit}</div>}
            {!loadingData && <div id="street">{postData.street}</div>}
            {!loadingData && <div id="country">{postData.country}</div>}</div>
            
        </div>
     );
}
 
export default PostPage;