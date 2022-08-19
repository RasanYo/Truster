import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { DBClientContext } from "../App"
import PostPreview from "./PostPreview"


const MyPosts = () => {

    const client = useContext(DBClientContext)
    const [posts, setPosts] = useState(null)
    const [loadingData, setLoadingData] = useState(posts == null)
    const previousUser = useRef(null)
    const navigate = useNavigate()

    const unsubscribe = client.auth.onAuthStateChanged(user => {
        if (user && user !== previousUser.current) {
            previousUser.current = user
            client.getDocument("users/regular/users", user.uid)
                .then(snapshot => {
                    setPosts(snapshot.data().myPosts)
                })
        }
    })


    useEffect(() => {
        if (posts) {
            setLoadingData(false)
            unsubscribe()
        } else {
            setLoadingData(true)
        }
    }, [posts])

    return ( 
        <div className="post-list">
            {loadingData && <div>Loading...</div>}
            {!loadingData && posts.map((post, index) => (
                <PostPreview 
                    post={post} 
                    key={index}
                    handleClick={e => {
                        e.preventDefault()
                        console.log(post)
                        navigate(`${post.id}`)
                    }}
                />
            ))}
        </div>
     );
}
 
export default MyPosts


 