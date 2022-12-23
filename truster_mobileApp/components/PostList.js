import { FlatList } from "react-native";
import PostContainer from "./PostContainer";

const PostList = ({
    query,
    retrieveMore
}) => {



    return ( 
        <FlatList 
            data={query.posts}
            renderItem={({ item }) => (<PostContainer post={item} />)}
            keyExtractor={post => post.id}
            onEndReached={retrieveMore}
        />
     );
}
 
export default PostList;

