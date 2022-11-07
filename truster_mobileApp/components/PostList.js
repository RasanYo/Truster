import { View } from "react-native";
import PostContainer from "./PostContainer";

const PostList = ({
    posts=null
}) => {


    return ( 
        <View className="post-list column-container">
            {posts && posts.map((post, index) => {
                    return <PostContainer post={post} key={index}/>
                })
            }
        </View>
     );
}
 
export default PostList;

