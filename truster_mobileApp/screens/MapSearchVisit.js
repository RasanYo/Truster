import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View , Animated, Keyboard} from "react-native";
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import {AntDesign} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useRef, useState } from "react";
import Autocomplete3 from "../objects/autocomplete/Autocomplete3";
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../context";

import * as Location from 'expo-location';
import { LocationAccuracy } from "expo-location";

// import Card from "../components/Card";


export default function MapSearchVisit({navigation}){
    const { user } = useContext(UserContext)
    const [isInputClicked,setIsInputClicked] = useState(false)
    // const coordinate = {
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.008,
    //     longitudeDelta: 0.008,
    // }
    const [coordinate,setCoordinate] = useState()
    const [result,setResult] = useState()
    const mapRef = useRef(null);
    const scrollview = useRef(null)
    const [radius,setRadius] = useState(5)
    const [markers,setMarkers] = useState()
    const [interpolations, setInterpolations] = useState()

    const [showCards, setShowCards] = useState(false)

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const {width,height} = Dimensions.get("window")
    const CARD_WIDTH = width * 0.8
    const SPACING_FOR_CARD_INSET = width*0.1 - 10

    let mapIndex = 0
    let mapAnimation = new Animated.Value(0);

    //useEffect pour l'animation lorsque qu'on passe d'un marker à un autre
    useEffect(() => {
            mapAnimation.addListener(({ value }) => {
                let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
                if (index >= markers.length) {
                  index = markers.length - 1;
                }
                if (index <= 0) {
                  index = 0;
                }
          
                clearTimeout(regionTimeout);
          
                const regionTimeout = setTimeout(() => {
                  if( mapIndex !== index ) {
                    mapIndex = index;
                    const  coordinate  = markers[index];
                    changeViewMap(coordinate.latitude,coordinate.longitude,radius/4,radius/4)
                  }
                }, 10);
              });
    
  },[markers]);

    // Use effect to ask for user location + retrieve pins near him at radius of 5 kms
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({accuracy : LocationAccuracy.Lowest});
          setLocation(location);
          
          const lat = location.coords.latitude
          const lng = location.coords.longitude
          setCoordinate({
            latitude : lat,
            longitude : lng,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          })
          user.getPublicPosts(radius, [lat,lng] , false, setResult)
        })();
      }, []);

    useEffect(() => {
        if(result){
            // console.log(result.length)
            const r = new Array(result.length).fill(0)
            // console.log(r)
            setMarkers(r)

            // setInterpolations(r.map((marker, index) => {
            //     const inputRange = [
            //       (index - 1) * CARD_WIDTH,
            //       index * CARD_WIDTH,
            //       ((index + 1) * CARD_WIDTH),
            //     ];
            
            //     const scale = mapAnimation.interpolate({
            //       inputRange,
            //       outputRange: [1, 1.5, 1],
            //       extrapolate: "clamp"
            //     });
            
            //     return { scale };
            //   }));
        }
    },[result])

    const changeViewMap = (lat,lng,latDelta,lngDelta) => {
        var newAdress = {}
        newAdress.latitude = lat
        newAdress.longitude = lng
        newAdress.latitudeDelta = latDelta*0.02
        newAdress.longitudeDelta = lngDelta*0.02
        mapRef.current.animateToRegion(newAdress,1000)
    
    }

    const handleSelection = (data,details) => {
        var geo = details.geometry.location
        changeViewMap(geo.lat,geo.lng,radius,radius)

        var country = "Italy"
        var city = "Milano"
        var t = details.address_components
        t.forEach(x => {
            if(x.types.includes("country")){
                country = x.long_name
            }else if(x.types.includes("locality")){
                city = x.long_name
            }
        })

        // console.log(country,city,radius,geo.lat,geo.lng)
        user.getPublicPosts(radius, [geo.lat,geo.lng] , false, setResult)
        setIsInputClicked(false)
    }

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
    
        let x = (markerID * CARD_WIDTH) + (markerID * 20); 
        if (Platform.OS === 'ios') {
          x = x - SPACING_FOR_CARD_INSET;
        }
    
        scrollview.current.scrollTo({x: x, y: 0, animated: true});
    }

    





    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss;setShowCards(false)}} accessible={false}>
        <View style={styles.container} >
            {coordinate && 
                    <MapView style={styles.map} initialRegion={coordinate} ref={mapRef} annotations={markers}>
                        {(result && markers) && <PinData pinsData={result} markers={markers} onMarkerPress={onMarkerPress} interpolations={interpolations}></PinData>}
                        {console.log(markers)}
                    </MapView>}
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Menu")} >
                            <View style={{marginTop:50,marginLeft:15,width:35,position:"absolute"}}>
                            <Ionicons name="caret-back-circle-outline" size={30} color="white" />
                            </View>
                </TouchableWithoutFeedback>

                <View style={styles.searchBar}>
                    <AntDesign name="search1" size={24} style={{alignSelf:"flex-start",marginTop:10}}/>
                    {isInputClicked ? 
                        <View style={styles.searchBarContainer}>
                            <Autocomplete3 setAddress={() => {}} isErasingAll={() => {}} setIsCity={() => {}}
                                    setIsStreetName={() => {}} setIsStreetNumber={() => {}} placeholder="" isFocus={true} handleSelection={handleSelection}/>
                        </View> :  
                        <TouchableWithoutFeedback onPress={() => setIsInputClicked(true)} >
                            <View>
                                <Text style={{fontSize:17}}>Where do you live</Text>
                                <Text style={{color:"gray"}}>Look for visits in your area</Text>
                            </View>
                        </TouchableWithoutFeedback>}

                    <MaterialCommunityIcons name="filter-menu" size={24} color="black" style={{alignSelf:"flex-start",marginTop:10}}/>
                </View>
                { <Animated.ScrollView 
                            ref={scrollview}
                            showsVerticalScrollIndicator={false}
                            horizontal
                            scrollEventThrottle={1}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                position: "absolute",
                                bottom: 30,
                                left: 0,
                                right: 0,
                                paddingVertical: 10,
                            }}
                            pagingEnabled
                            snapToInterval={CARD_WIDTH+10}
                            snapToAlignment="center"
                            // contentInset={{
                            //     top:0,
                            //     left : SPACING_FOR_CARD_INSET,
                            //     bottom : 0,
                            //     right : SPACING_FOR_CARD_INSET
                            // }}
                            contentContainerStyle={{
                                paddingHorizontal : Platform.OS == "android" ? SPACING_FOR_CARD_INSET : 0
                            }}
                            onScroll={Animated.event(
                                [
                                    {
                                    nativeEvent: {
                                        contentOffset: {
                                        x: mapAnimation,
                                        }
                                    },
                                    },
                                ],
                                {useNativeDriver: true}
                                )}
                            >
                            {/* { result && result.map((info,index) => {
                                return <Card itemData={{title : info.data().address.fullAdress,description : info.data().description, time : info.data().timeframe.end}}></Card>
                                
                                    
                            })} */}
                </Animated.ScrollView>}
                
                
        </View>
        </TouchableWithoutFeedback>
    
    
    )
    
}

export const PinData = ({ pinsData,markers,onMarkerPress,interpolations}) => {

    
    return pinsData.map((pin,index) => {
        // console.log(interpolations)
        // const scaleStyle = {
        //     transform: [
        //       {
        //         scale: interpolations[index].scale,
        //       },
        //     ],
        //   };
        
        var coordinate = {
            latitude: pin.data().address.lat,
            longitude: pin.data().address.lng,
        }
        markers[index] = coordinate
        console.log(markers)
        return <Marker key={index} coordinate={coordinate} onPress={(e) => onMarkerPress(e)}>
            <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                //   style={[styles.marker, scaleStyle]}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
          </Marker>
    })
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ededed',
    },
    map: {
      width: "100%",
      height: "100%",
      zIndex:-1
    },

    searchBar : {
        position:"absolute",
        top : 100,
        left : 35,
        backgroundColor:"white",
        width:350,
        height:"auto",
        padding:10,
        borderRadius : 30,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },

    searchBarContainer: {
        position: "relative",
        zIndex:100,
        // top: 13,
        // left : 40,
        width:270,
      },

    adressInput : {
        borderWidth:1,
        borderRadius:10,
        flexDirection:"row",
        zIndex:1,
        height:"auto"
    },

    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
      },

    marker: {
        width: 40,
        height: 40,
      },
})