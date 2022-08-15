import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DBClientContext } from "../App"

const MyPosts = () => {

    const client = useContext(DBClientContext)
    const [posts, setPosts] = useState(null)
    const [loadingData, setLoadingData] = useState(posts == null)

    client.auth.onAuthStateChanged(user => {
        if (user) {
            client.getDocument("users/regular/users", user.uid)
                .then(snapshot => {
                    setPosts(snapshot.data().myPosts)
                })
        }
    })

    useEffect(() => {
        if (posts) setLoadingData(false)
        else {
            setLoadingData(true)
        }
    }, [posts])

    return ( 
        <div className="post-list">
            {loadingData && <div>Loading...</div>}
            {!loadingData && posts.map((post, index) => (
                <PostPreview post={post} key={index}/>
            ))}
        </div>
     );
}
 
export default MyPosts

const PostPreview = ({ post }) => {

    const navigate = useNavigate()

    const handleClick = e => {
        e.preventDefault()
        navigate(`${post.id}`)
    }

    return ( 
        <div className="post-preview" onClick={handleClick}>
            <div className="left-post-preview">
                <h3>{post.street}</h3>
                <h4>{post.city}, {post.country}</h4>
            </div>
            <div className="right-post-preview">
                <h3>{post.dateVisit}</h3>
            </div>
        </div>
     );
}
 