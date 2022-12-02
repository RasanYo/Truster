import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserContext } from "../context";
import PostList from "../components/PostList";
// import { useFonts } from 'expo-font';
import Autocomplete from "../objects/autocomplete/Autocomplete";
import AddressInput from "../components/AddressInput";


export default function VisitAppartments({navigation}){

    // const [fontsLoaded] = useFonts({
    //     'NTR': require('../assets/fonts/NTR-Regular.ttf')
    //   });

    const {user} = useContext(UserContext)
    const [inputClicked, setInputClicked] = useState(false)

    
    const [posts, setPosts] = useState(null)
    // useEffect(() => {
    //     user
    //         .getPostsFrom("Germany", "Berlin")
    //         .then(docs => {
    //             setPosts(docs)
    //         })
    // }, [user])

    const handleSelection = (data,details) => {
        var geo = details.geometry.location
        user.getPublicPosts(5000, [geo.lat, geo.lng], false).then(res => {
            const data = res.map(resDoc => {return resDoc.data()})
            setPosts(data)
            console.log(posts)
        })
    }
    


    return ( 
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Visit appartments,</Text>
                <Text style={styles.title2}>Become a Trusty</Text>
            </View>
            <Text onPress={() => navigation.navigate("Menu")}>go back</Text>
            <View style={styles.searchBarContainer}>
                <AddressInput 
                    isInputClicked={inputClicked} setIsInputClicked={setInputClicked}
                    handleSelection={handleSelection}
                />
            </View>
            
            <View style={{marginTop:80, flex: 1}}>
                {posts && <PostList posts={posts}/>}
            </View>
            
        </View>
     );
}

const styles = StyleSheet.create({
    mainContainer: {
        color: '#EBEBEB',
        flexDirection: "column",
        flex: 1
    },

    titleContainer: {
        marginLeft: 15
    },

    title: {
        // fontFamily: 'NTR',
        fontSize: 40,
        marginTop: 30
        // lineHeight: 1.25
    },

    title2: {
        // fontFamily: 'NTR',
        fontSize: 40,
        marginTop: 15,
        marginBottom: 30,
        // lineHeight: 1.25,
        color: '#00D394'
    },
    searchBarContainer: {
        alignItems: 'center',
        marginBottom: 20
    }
})
 