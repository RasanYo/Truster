import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import {AntDesign} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useRef, useState } from "react";
import Autocomplete3 from "../objects/autocomplete/Autocomplete3";
import { set } from "firebase/database";
import { UserContext } from "../App";
import { Ionicons } from '@expo/vector-icons';







export default function MapSearchVisit({navigation}){
    const { user } = useContext(UserContext)
    const [isInputClicked,setIsInputClicked] = useState(false)
    const coordinate = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
    }
    const [result,setResult] = useState()
    const mapRef = useRef(null);
    const [radius,setRadius] = useState(5)
    var markers = [0,0,0,0,0,0,0,0,0]
    

    // useEffect(() => {
    //     user.getPublicPosts("Italy", "Milano", {radiusInKm : radius, center : [45.4642035,9.189982]} , false, setResult)
    // },[])

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

        console.log(country,city,radius,geo.lat,geo.lng)
        user.getPublicPosts(country, city, {radiusInKm : radius, center : [geo.lat,geo.lng]} , false, setResult)
        setIsInputClicked(false)
    }



    return (
    
    <View style={styles.container}>
       {coordinate && 
            <MapView style={styles.map} initialRegion={coordinate} ref={mapRef} annotations={markers}>
                {result && <PinData pinsData={result} markers={markers}></PinData>}
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
                            setIsStreetName={() => {}} setIsStreetNumber={() => {}} placeholder="" isFocus={true} handleSelection={handleSelection}></Autocomplete3>
                </View> :  
                <TouchableWithoutFeedback onPress={() => setIsInputClicked(true)} >
                    <View>
                        {/* {result && result.forEach(x => {
                 console.log(x.data())
             })} */}
                        <Text style={{fontSize:17}}>Where do you live</Text>
                        <Text style={{color:"gray"}}>Look for visits in your area</Text>
                    </View>
                </TouchableWithoutFeedback>}

            <MaterialCommunityIcons name="filter-menu" size={24} color="black" style={{alignSelf:"flex-start",marginTop:10}}/>
        </View>
    </View>
    
    )
    
}

export const PinData = ({ pinsData,markers}) => {
    return pinsData.map((pin, index) => (
      <Marker
        key={index}
        ref={ref => (markers[index] = ref)}
        coordinate={{
          longitude: pin.data().address.lng,
          latitude: pin.data().address.lat
        }}
      />
    ));
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
})