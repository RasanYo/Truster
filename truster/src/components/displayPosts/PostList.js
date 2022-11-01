import { useMemo } from "react";
import { useState } from "react";
import PostContainer from "./PostContainer";

const PostList = ({
    posts=null,
    defaultChunkSize=3
}) => {

    const [chunkSize, setChunkSize] = useState(defaultChunkSize)

    const postChunks = useMemo(() => {
        const chunks = []
        for (var i = 0; i < posts.length; i += chunkSize) {
            chunks.push(posts.slice(i, i + chunkSize))
        }
        return chunks
    }, [posts, chunkSize])



    return ( 
        <div className="post-list column-container">
            <select value={chunkSize} onChange={e => setChunkSize(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
            </select>
            {postChunks.map((post, index) => {
                return <div className="row-container" key={-index}>{post.map((x, i) => {
                    return <PostContainer post={x} key={index+i}/>
                })}
                </div>
            })}
        </div>
     );
}
 
export default PostList;