import { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { UserContext } from "../context";
import PostList from "../components/PostList";
// import { useFonts } from 'expo-font';
import AddressInput from "../components/AddressInput";
import { limit, orderBy, startAfter } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from "@miblanchard/react-native-slider";

export default function VisitAppartments({navigation,route}){

    // const [fontsLoaded] = useFonts({
    //     'NTR': require('../assets/fonts/NTR-Regular.ttf')
    //   });

    const {user} = useContext(UserContext)
    const [inputClicked, setInputClicked] = useState(false)

    const [geoCoords, setGeoCoords] = useState({
        lat: null,
        lng: null
    })
    const [radius, setRadius] = useState(10)

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
        console.log("COORDS", geoCoords)
        user.getPublicPosts(radius, [geo.lat, geo.lng], false, limit(queryState.limit)).then(res => {
            let data = res.map(resDoc => {return resDoc.data()})
            let lastVisible = data[data.length -1].geohash
            console.log("LAST_VISIBLE", lastVisible)
            setQueryState({
                posts: data,
                lastVisible: lastVisible,
                loading: false
            })
            console.log("data from query", data)
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
                radius, 
                [geoCoords.lat, geoCoords.lng], 
                false, 
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
        <View style={{flex: 1}}>
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Visit appartments,</Text>
                    <Text style={styles.title2}>Become a Trusty</Text>
                </View>
                {/* <Text onPress={() => navigation.pop()}>go back</Text> */}
                <View style={styles.searchBarContainer}>
                    <View 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'center',
                            paddingHorizontal: 100  
                        }}
                    >
                        <Text style={{marginRight: 10}}>Radius: {radius} km</Text>
                        <Slider 
                            value={radius}
                            onValueChange={value => setRadius(value)}
                            minimumValue={1}
                            maximumValue={100}
                            step={1}
                            containerStyle={{
                                width: '100%',
                            }}
                        />
                    </View>
                    <View style={{zIndex: 1}}>
                        <AddressInput 
                            isInputClicked={inputClicked} setIsInputClicked={setInputClicked}
                            handleSelection={handleSelection}
                        />
                    </View>
                    
                    
                </View>
                
                <View style={{marginTop:20, flex: 1}}>
                    <PostList query={queryState} retrieveMore={retrieveMore} nav={navigation}/>
                </View>
                
            </View>
            <TouchableWithoutFeedback 
                onPress={() => navigation.pop()}
            >
                <View style={{
                        position: "absolute",
                        bottom: 80,
                        left: 150,
                        backgroundColor: "black",
                        width:100,
                        height: "auto",
                        borderRadius: 15,
                        flexDirection: "row",
                        padding:10,
                        justifyContent: "space-around",
                        opacity: 0.7,
                        zIndex: 100
                    }}>
                    <MaterialCommunityIcons name="map" size={22} color="white" />
                    <Text style={{color: "white",fontSize:16}}>Map</Text>
                </View>
                
            </TouchableWithoutFeedback>
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
        marginBottom: 5,
    }
})
 