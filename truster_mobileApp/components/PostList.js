import { ScrollView, View } from "react-native";
import PostContainer from "./PostContainer";

const PostList = ({
    posts=null
}) => {


    return ( 
        <ScrollView className="post-list column-container">
            {posts && posts.map((post, index) => {
                    return <PostContainer post={post} key={index}/>
                })
            }
        </ScrollView>
     );
}
 
export default PostList;

