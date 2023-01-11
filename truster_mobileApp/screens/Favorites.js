import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PostList from "../components/PostList";
import { UserContext } from "../context";

export default function Favorites({navigation}){

    const {user} = useContext(UserContext)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        console.log("using effeect in Favorites")
        user.getFavoritesPosts().then(arrayOfFavoritesPosts => {
            setFavorites(arrayOfFavoritesPosts)
        })
    }, [])

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

