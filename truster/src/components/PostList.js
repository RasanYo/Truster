import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import PostContainer from "./PostContainer";

const PostList = ({chunkSize=3}) => {

    const [posts, setPosts] = useState([[0, 1, 2], [3, 4, 5], [6, 7]])


    const postChunks = useMemo(() => {
        const chunks = []
        for (let i = 0; i < posts.length; i += chunkSize) {
            chunks.push(posts.slice(i, i + chunkSize))
        }
        return chunks
    }, [posts])



    return ( 
        <div className="post-list column-container">
            {posts.map((chunk, i) => {
                return <div key={i*chunkSize} className="row-container">
                    {chunk.map((post, j) => {
                        <PostContainer post={post} key={j+i} />
                    })}
                </div>
            })}
        </div>
     );
}
 
export default PostList;