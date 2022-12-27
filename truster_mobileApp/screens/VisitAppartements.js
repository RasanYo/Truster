import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserContext } from "../context";
import PostList from "../components/PostList";
// import { useFonts } from 'expo-font';
import AddressInput from "../components/AddressInput";
import { limit, orderBy, startAfter } from "firebase/firestore";


export default function VisitAppartments({navigation}){

    // const [fontsLoaded] = useFonts({
    //     'NTR': require('../assets/fonts/NTR-Regular.ttf')
    //   });

    const {user} = useContext(UserContext)
    const [inputClicked, setInputClicked] = useState(false)

    const [geoCoords, setGeoCoords] = useState({
        lat: null,
        lng: null
    })

    const [queryState, setQueryState] = useState({
        posts: [],
        limit: 5,
        lastVisible: null,
        loading: false,
        refreshing: false
    })


    const handleSelection = (data,details) => {
        var geo = details.geometry.location
        setGeoCoords({
            lat: geo.lat,
            lng: geo.lng
        })
        user.getPublicPosts(500, [geo.lat, geo.lng], true, limit(queryState.limit)).then(res => {
            let data = res.map(resDoc => {return resDoc.data()})
            let lastVisible = data[data.length -1].geohash
            console.log("LAST_VISIBLE", lastVisible)
            setQueryState({
                posts: data,
                lastVisible: lastVisible,
                loading: false
            })
        })
        .catch(err => {
            console.log(err)
        })
    }


    const retrieveMore = () => {
        console.log("RETRIEVING MORE")
        setQueryState({
            ... queryState,
            refreshing: true
        })
        try {
            user.getPublicPosts(
                5000, 
                [geoCoords.lat, geoCoords.lng], 
                true, 
                startAfter(queryState.lastVisible), limit(queryState.limit)
            ).then(res => {
            let data = res.map(resDoc => {return resDoc.data()})
            if (data.length) {
                let lastVisible = data[data.length -1].id
                setQueryState({
                    posts: data,
                    lastVisible: lastVisible,
                    loading: false
                })
            } else {
                console.log("REACHED THE END")
            }
                
            })
        } catch (err) {
            setQueryState({
                refreshing: false
            })
            console.log("REACHED THE END")
        }
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
            
            <View style={{marginTop:20, flex: 1}}>
                <PostList query={queryState} retrieveMore={retrieveMore} nav={navigation}/>
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
        // marginBottom: 20
    }
})
 