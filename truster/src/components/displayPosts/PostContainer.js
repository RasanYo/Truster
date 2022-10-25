import { useEffect } from "react";
import { Helper } from "../../Helper";

const PostContainer = ({post=null}) => {

    return ( 
        <div style={{marginBottom: '10px', borderStyle: 'solid'}}>
            {post && <div>
                Address: {post.address.address}
                <br />
                Between {post.timeframe.start} and {post.timeframe.end}
                <br />
                <br />
            </div>}
        </div>
     );
}
 
export default PostContainer;