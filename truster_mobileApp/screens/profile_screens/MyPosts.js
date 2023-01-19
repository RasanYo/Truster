import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import PostList from "../../components/PostList";
import { UserContext } from "../../context";

const MyPosts = ({navigation}) => {

    const {user} = useContext(UserContext)

    const [queryState, setQueryState] = useState({
        posts: null,
        limit: 5,
        lastVisible: null,
        loading: false,
        refreshing: false
    })

    useEffect(() => {
        user.getPosts().then(p => {
            setQueryState({
                ...queryState,
                posts: p
            })
        })
    }, [])

    return ( 
        <View>
            <PostList 
                query={queryState}
                retrieveMore={() => {}}
                nav={navigation}
            />
        </View>
     );
}
 
export default MyPosts;