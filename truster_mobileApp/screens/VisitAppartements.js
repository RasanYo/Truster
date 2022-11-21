import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserContext } from "../App";
import PostList from "../components/PostList";
// import { useFonts } from 'expo-font';
import Autocomplete from "../objects/autocomplete/Autocomplete";


export default function VisitAppartments({navigation}){

    // const [fontsLoaded] = useFonts({
    //     'NTR': require('../assets/fonts/NTR-Regular.ttf')
    //   });

    const {user} = useContext(UserContext)

    // const posts = [
    //     {
    //         address: {
    //             address: '12345 Testbourg, Testland'
    //         },
    //         timeframe: {
    //             start: "24/06/2023",
    //             end: "01/09/2023"
    //         }
    //     },
    //     {
    //         address: {
    //             address: '12345 Testbourg, Testland'
    //         },
    //         timeframe: {
    //             start: "24/06/2023",
    //             end: "01/09/2023"
    //         }
    //     },
    //     {
    //         address: {
    //             address: '12345 Testbourg, Testland'
    //         },
    //         timeframe: {
    //             start: "24/06/2023",
    //             end: "01/09/2023"
    //         }
    //     },
    //     {
    //         address: {
    //             address: '12345 Testbourg, Testland'
    //         },
    //         timeframe: {
    //             start: "24/06/2023",
    //             end: "01/09/2023"
    //         }
    //     }
    // ]
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        user
            .getPostsFrom("France", "Strasbourg")
            .then(docs => {
                setPosts(docs)
                console.log(posts)
            })
    }, [user])
    


    return ( 
        <View style={styles.mainContainer}>
            <View style={{margin: 30}}>
                <Text style={styles.title}>Visit appartments,</Text>
                <Text style={styles.title2}>Make Money</Text>
            </View>
            <View>
                {/* <AutoComplete /> */}
            </View>
            <Text onPress={() => navigation.navigate("Menu")}>go back</Text>
            {posts && <PostList posts={posts}/>}
        </View>
     );
}

const styles = StyleSheet.create({
    mainContainer: {
        color: '#EBEBEB'
    },

    title: {
        // fontFamily: 'NTR',
        fontSize: 45,
        lineHeight: 1.25
    },

    title2: {
        // fontFamily: 'NTR',
        fontSize: 45,
        lineHeight: 1.25,
        color: '#00D394'
    }
})
 