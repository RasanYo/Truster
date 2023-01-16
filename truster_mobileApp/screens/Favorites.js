import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PostList from "../components/PostList";
import { UserContext } from "../context";
import { doc, onSnapshot } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";

  
export default function Favorites({navigation}){

    const {user} = useContext(UserContext)
    const [favorites,setFavorites] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(user.db, COLLECTIONS.REGULAR_USERS,user.getUID()), (doc) => {
            console.log("Current data: ", doc.data());
            var favoritesIDs = doc.data().myFavorites

            console.log("using effeect in Favorites")
            if(favoritesIDs.length > 0){
                user.getFavoritesPosts(favoritesIDs).then(arrayOfFavoritesPosts => {
                setFavorites(arrayOfFavoritesPosts)
                })
            }
        });
        
    }, [])

    // const [isFavorite, setIsFavorite] = useState()

    // useEffect(() => {
    //     console.log("using effeect in Favorites")
    //     if(user.getFavorites().length > 0){
    //         user.getFavoritesPosts().then(arrayOfFavoritesPosts => {
    //             setFavorites(arrayOfFavoritesPosts)
    //         })
    //     }

    // }, [user.favoritesIDs])


    return ( 
        <SafeAreaView style={styles.container}>
            <Text style={{marginLeft:30,fontSize:40}}>Favorites</Text>
            <Text style={{marginLeft:30,color:"grey"}}>You have saved these visits</Text>
            <Text style={{marginLeft:30,color:"grey"}}>beware they go fast !</Text>
            {favorites.length != 0 && 
                <View style={{marginTop:20, flex: 1}}>
                    <PostList query={{posts : favorites}} retrieveMore={() => {}} nav={navigation}/>
                </View>
                }
            
        </SafeAreaView>
     );
}
 
//create default css for this screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

