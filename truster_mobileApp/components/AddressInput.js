import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import {AntDesign} from "@expo/vector-icons";
import Autocomplete3 from "../objects/autocomplete/Autocomplete3";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import triggerActionSheet from "../hooks/triggerActionSheet";


export default function AddressInput({
    handleSelection,
    isInputClicked, setIsInputClicked
}) {

    const showMenu = triggerActionSheet(['Distance down', 'Distance up', 'Price up', 'Price down'])

    return (
        <View style={styles.searchBar}>
            <AntDesign name="search1" size={24} style={{alignSelf:"flex-start",marginTop:7}}/>
            {isInputClicked ? 
                <View style={styles.searchBarContainer}>
                    <Autocomplete3 setAddress={() => {}} isErasingAll={() => {}} setIsCity={() => {}}
                        setIsStreetName={() => {}} setIsStreetNumber={() => {}} placeholder="" isFocus={true} handleSelection={handleSelection}></Autocomplete3>
                </View> :  
                <TouchableWithoutFeedback onPress={() => setIsInputClicked(true)}>
                    <View>
                        <Text style={{fontSize:17}}>Where do you live</Text>
                        <Text style={{color:"gray"}}>Look for visits in your area</Text>
                    </View>
                </TouchableWithoutFeedback>}
            <TouchableOpacity style={{alignSelf:"flex-start",marginTop:7}} onPress={() => {
                console.log("CHECK")
                showMenu()
            }}>
                <MaterialCommunityIcons name="filter-menu" size={24} color="black" />
            </TouchableOpacity>
            
        </View>
    )
                  
}

const styles = StyleSheet.create({
    searchBar : {
        position: "relative",
        backgroundColor: "white",
        width: 350,
        height: "auto",
        padding: 10,
        borderRadius : 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    searchBarContainer: {
        position: "absolute",
        zIndex:100,
        top: 13,
        left : 40,
        width:270,
      },
})