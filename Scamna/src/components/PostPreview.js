import { useNavigate } from "react-router-dom"
const PostPreview = ({ post, user="", handleClick }) => {

    const navigate = useNavigate()

    return ( 
        <div className="post-preview" onClick={handleClick}>
            <div className="left-post-preview">
                <h3>{post.street}</h3>
                <h4>{post.city}, {post.country}</h4>
            </div>
            <div className="right-post-preview">
                <h3>{post.dateVisit}</h3>
            </div>
            <div className="user-label">{user}</div>
        </div>
     );
}

export default PostPreview;