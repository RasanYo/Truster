import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { COLLECTIONS } from "../Constants";
import { UserContext } from "../context";
import PostContainer from "./PostContainer";

const PostList = ({
    query,
    retrieveMore,
    nav,
}) => {
    const {user} = useContext(UserContext)
    const [favoritesIds,setFavoritesIds] = useState()

    useEffect(() => {
        const unsub = onSnapshot(doc(user.db, COLLECTIONS.REGULAR_USERS,user.getUID()), (doc) => {
            setFavoritesIds(doc.data().myFavorites)
            console.log("Favorite Ids ", doc.data().myFavorites);
        });
        
    }, [])


    useEffect(() => {
        console.log("POSTLIST", query.posts)
    }, [])

    return ( 
        <FlatList 
            data={query.posts}
            renderItem={({ item }) => (<PostContainer post={item} navigation={nav} isFavorite={favoritesIds ? favoritesIds.includes(item.id) : false} 
                                                      />)}
            keyExtractor={post => post.id}
            onEndReached={retrieveMore}
        />
     );
}
 
export default PostList;

