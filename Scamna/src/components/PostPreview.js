import { useNavigate } from "react-router-dom"
import { FiChevronUp, FiChevronDown} from "react-icons/fi";
import { useState } from "react";
import RequesterList from "./RequesterList";
const PostPreview = ({ post, user="", handleClick, id=post.id }) => {

    const navigate = useNavigate()
    const [rolledDown, setRolledDown] = useState(false)

    const handleRollDown = e => {
        e.preventDefault()
        setRolledDown(!rolledDown)

    }

    return ( 
        <div className="post-preview">
            <div className="header">
                <div className="left-post-preview" onClick={handleClick}>
                    <h3>{post.street}</h3>
                    <h4>{post.city}, {post.country}</h4>
                </div>
                <div className="right-post-preview">
                    <h3>{post.dateVisit}</h3>
                    <span>
                    <FiChevronDown style={{
                            transform: rolledDown ? "rotate(-180deg)" : "rotate(0)"
                        }}  onClick={handleRollDown} size="24px" className="icon"/>
                    </span>
                    
                    <div className="user-label">{user}</div>
                </div>
            </div>
            
            <RequesterList style={{
                display: rolledDown ? 'block' : 'none'
            }} postID={id} />
        </div>
     );
}

export default PostPreview;