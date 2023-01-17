import { query } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import PostList from "../../components/PostList";
import { UserContext } from "../../context";

const MyRequests = ({navigation}) => {

    const {user} = useContext(UserContext)

    const [queryState, setQueryState] = useState({
        posts: null,
        limit: 5,
        lastVisible: null,
        loading: false,
        refreshing: false
    })

    useEffect(() => {
        user.getRequests().then(p => {
            setQueryState({
                ...queryState,
                posts: p
            })
        })
    }, [])

    return ( 
        <View>
            {queryState.posts && <PostList 
                query={queryState}
                retrieveMore={() => {}}
                nav={navigation}
            />}
        </View>
     );
}
 
export default MyRequests;