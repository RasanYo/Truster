import { FlatList, ScrollView, View } from "react-native";
import PostContainer from "./PostContainer";

const PostList = ({
    posts=null
}) => {


    return ( 
        <ScrollView >
            {posts && posts.map((post, index) => {
                    return <PostContainer post={post} key={index}/>
                })
            }
        </ScrollView>
        // <View>
        //     <FlatList 
        //         data={posts}
        //         renderItem={({ post }) => {return <PostContainer post={post} />}}
        //         // keyExtractor={post => post.id}
        //     />
        // </View>
        

     );
}
 
export default PostList;

