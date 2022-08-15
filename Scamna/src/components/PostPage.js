import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DBClientContext } from "../App";

const PostPage = () => {

    const {id} = useParams();
    const client = useContext(DBClientContext);

    const [postData, setPostData] = useState(null)
    const [loadingData, setLoadingData] = useState(postData == null)

    client.getDocument("posts/notVisited/posts",id).then(snapshot => {
        setPostData(snapshot.data())
    })

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