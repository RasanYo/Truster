import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MapView from "react-native-maps";
import {AntDesign} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import Autocomplete3 from "../objects/autocomplete/Autocomplete3";
import { set } from "firebase/database";






export default function MapSearchVisit(){

    const [isInputClicked,setIsInputClicked] = useState(false)
    const [coordinate,setCoordinate] = useState()
    const mapRef = useRef(null);


    useEffect(() => {
        setCoordinate({
            latitude: 17.6868159,
            longitude: 0.008,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
        })
    },[])

    const handleSelection = (data,details) => {
        var geo = details.geometry.location
        var newAdress = {}

        newAdress.latitude = geo.lat
        newAdress.longitude = geo.lng
        newAdress.latitudeDelta = 0.03
        newAdress.longitudeDelta = 0.03
        // console.log(newAdress)
        // setCoordinate(newAdress)
        mapRef.current.animateToRegion(newAdress,1000)
        setIsInputClicked(false)
    }

    return (
    
    <View style={styles.container}>
       {coordinate && <MapView style={styles.map} initialRegion={coordinate}
                ref={mapRef}

                // onRegionChange={{
                //     latitude : coordinate.latitude,
                //     longitude : coordinate.longitude,
                //     latitudeDelta: 0.008,
                //     longitudeDelta: 0.008,
                // }}
                >
            </MapView>}

        <View style={styles.searchBar}>
            <AntDesign name="search1" size={24} style={{alignSelf:"flex-start",marginTop:10}}/>
            {isInputClicked ? 
                <View style={styles.searchBarContainer}>
                    <Autocomplete3 setAddress={() => {}} isErasingAll={() => {}} setIsCity={() => {}}
                            setIsStreetName={() => {}} setIsStreetNumber={() => {}} placeholder="" isFocus={true} handleSelection={handleSelection}></Autocomplete3>
                </View> :  
                <TouchableWithoutFeedback onPress={() => setIsInputClicked(true)} >
                    <View>
                            {console.log(coordinate)}
                        <Text style={{fontSize:17}}>Where do you live</Text>
                        <Text style={{color:"gray"}}>Look for visits in your area</Text>
                    </View>
                </TouchableWithoutFeedback>}

            <MaterialCommunityIcons name="filter-menu" size={24} color="black" style={{alignSelf:"flex-start",marginTop:10}}/>
        </View>
    </View>
    
    )
    
}

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