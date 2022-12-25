import { FlatList } from "react-native";
import PostContainer from "./PostContainer";

const PostList = ({
    query,
    retrieveMore,
    nav
}) => {



    return ( 
        <FlatList 
            data={query.posts}
            renderItem={({ item }) => (<PostContainer post={item} navigation={nav} />)}
            keyExtractor={post => post.id}
            onEndReached={retrieveMore}
        />
     );
}
 
export default PostList;

