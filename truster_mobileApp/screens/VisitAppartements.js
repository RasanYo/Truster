import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { UserContext } from "../context";
import PostList from "../components/PostList";
// import { useFonts } from 'expo-font';
import AddressInput from "../components/AddressInput";
import { limit, orderBy, startAfter } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from "@miblanchard/react-native-slider";
import Autocomplete3 from "../objects/autocomplete/Autocomplete3";

export default function VisitAppartments({navigation,route}){

    // const [fontsLoaded] = useFonts({
    //     'NTR': require('../assets/fonts/NTR-Regular.ttf')
    //   });

    const {user} = useContext(UserContext)
    const [inputClicked, setInputClicked] = useState(false)
    const  {result, coords} = route.params ? route.params : []

    const [geoCoords, setGeoCoords] = useState({
        lat: coords.latitude,
        lng: coords.longitude
    })
    const [radius, setRadius] = useState(10)

    const [queryState, setQueryState] = useState({
        posts: result,
        // posts: [],
        limit: 5,
        lastVisible: result.length ? result[result.length-1].geohash : null,
        // lastVisible: null,
        loading: false,
        refreshing: false
    })

    useEffect(() => {
        console.log("COORDS", geoCoords)
        setInputClicked(false)
    }, [])


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

        setInputClicked(false)
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
        <View style={{flex: 1}} onPress={() => setInputClicked(false)}>
            <View style={styles.mainContainer} onPress={() => {Keyboard.dismiss; setInputClicked(false)}}>
                <View style={styles.titleContainer} onPress={() => {Keyboard.dismiss; setInputClicked(false)}}>
                    <Text style={styles.title}>Visit appartments,</Text>
                    <Text style={styles.title2}>Become a Trusty</Text>
                </View>
                {/* <Text onPress={() => navigation.pop()}>go back</Text> */}
                <View style={styles.slideAndSearchBar}>
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
                    <View style={styles.searchBar}>
                        <AntDesign name="search1" size={24} style={{alignSelf:"flex-start",marginTop:15}}/>
                        {inputClicked ? 
                            <View style={styles.searchBarContainer}>
                                <Autocomplete3 
                                    setAddress={() => {}} 
                                    isErasingAll={() => {}} 
                                    setIsCity={() => {}}
                                    setIsStreetName={() => {}} 
                                    setIsStreetNumber={() => {}} 
                                    placeholder="" 
                                    isFocus={true} 
                                    handleSelection={handleSelection}>
                                </Autocomplete3>
                            </View> :  
                            <TouchableWithoutFeedback onPress={() => setInputClicked(true)}>
                                <View style={{marginVertical:4,marginHorizontal:40}}>
                                    <Text style={{fontSize:17}}>Where do you live</Text>
                                    <Text style={{color:"gray"}}>Look for visits in your area</Text>
                                </View>
                            </TouchableWithoutFeedback>}
                        
                        </View>
                    
                    
                </View>
                
                <View style={{marginTop:20, flex: 1, zIndex:-100}} onPress={() => {Keyboard.dismiss; setInputClicked(false)}}>
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
    slideAndSearchBar: {
        alignItems: 'center',
        marginBottom: 5,
    },

    searchBar : {
        position: "relative",
        backgroundColor: "white",
        width: 350,
        height: 70,
        padding: 10,
        borderRadius : 30,
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
    },

    searchBarContainer: {
        position: "absolute",
        zIndex:100,
        top: 11,
        left : 40,
        width:305,
      },
})
 