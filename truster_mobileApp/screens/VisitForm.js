import { useContext, useEffect, useState } from "react"
import {FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from "react-native"
// import {FlatList} from 'react-native-gesture-handler'
import {AntDesign} from "@expo/vector-icons"
import {FontAwesome} from "@expo/vector-icons"
import {FontAwesome5} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Autocomplete3 from "../objects/autocomplete/Autocomplete3";
import { UserContext } from "../context";
import { Post } from "../objects/Post";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


// Ce quil manque à faire c'est d'inclure les types d'accomodation dans les posts information
export default function VisitForm({navigation}){
    const [address,setAddress] = useState("")
    const [accomodationSelected,setAccomodationSelected] = useState(null)
    const [tomorrow, setTomorrow] = useState('');
    const [inTwoDays, setInTwoDays] = useState('');
    const [inThreeDays, setInThreeDays] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [description,setDescription] = useState("");
    const [isCity,setIsCity] = useState(false)
    const [isStreetNumber,setIsStreetNumber] = useState(false)
    const [isStreetName,setIsStreetName] = useState(false)

    const [isErasingAll,setIsErasingAll] = useState(false)

    useEffect(() => {
        setIsErasingAll(false)
    },[address,accomodationSelected,selectedDate,description])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
      };

    const handleTomorrow = (nbDays) => {
        var today = new Date()
        var aux = new Date()
        aux.setDate(today.getDate() + nbDays)
        setSelectedDate(aux)
        console.log(aux)
    }

    const handleAccommodationSelected = (val) => {
        console.log(val)
        setAccomodationSelected(val)
        console.log(selectedDate)
    }

    const dateToString = (date) => {
        var day = date.getDate()
        var month = date.getMonth() + 1; //Current Month
        var year = date.getFullYear(); //Current Year
        return day + '/' + month + '/' + year
    }

    const isSameDate = (d1,d2) => {
        return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
    }

    useEffect(() => {
        console.log(1)
        var today = new Date();
        var dateInTwoDays = new Date();
        dateInTwoDays.setDate(today.getDate() + 2);
        setInTwoDays(dateInTwoDays)

        var dateInOneDay = new Date();
        dateInOneDay.setDate(today.getDate() + 1);
        setTomorrow(dateInOneDay)
        setSelectedDate(dateInOneDay)

        var dateInThreeDays = new Date();
        dateInThreeDays.setDate(today.getDate() + 3);
        setInThreeDays(dateInThreeDays);

        //-----

        setIsCity(true)
        setIsStreetName(true)
        setIsStreetNumber(true)

    }, []);

    const accomodationOption = [
        {
            icon: <AntDesign name="home" size={20} style={styles.icon}/>,
            text : "House"
        }, 
        {
            icon : <FontAwesome name="building-o" size={20} style={styles.icon}/>,
            text : "Appartment"
        },
        {
            icon: <FontAwesome5 name="warehouse" size={20} style={styles.icon}/>,
            text : "Local"
        }
    ]

    const eraseAll = () => {
        setIsErasingAll(true)
        setAccomodationSelected(null)
        setSelectedDate(tomorrow)
        setDescription("")
    }

    const handleSelection = (data,details) => {
        setIsCity(false)
        setIsStreetName(false)
        setIsStreetNumber(false)
        var geo = details.geometry.location
        var t = details.address_components
        console.log(t)
        var newAdress = {}

        newAdress.lat = geo.lat
        newAdress.lng = geo.lng
        newAdress.fullAdress = details.formatted_address

        t.forEach(x => {
            if(x.types.includes("street_number")){
                newAdress.number = x.long_name
                setIsStreetNumber(true)
            }else if(x.types.includes("route")){
                newAdress.street = x.long_name
                setIsStreetName(true)
            }else if(x.types.includes("postal_code")){
                newAdress.npa = x.long_name
            }else if(x.types.includes("country")){
                newAdress.country = x.long_name
            }else if(x.types.includes("locality")){
                newAdress.city = x.long_name
                setIsCity(true)
            }
        })
        console.log(newAdress)
        if(Object.getOwnPropertyNames(newAdress).length != 8){
            console.log("Information missing")
        }else{
            setAddress(newAdress)
        }
        }

    return(
        
        <View style={styles.container}>
            <KeyboardAwareScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1 }}>
                
                {/* <Text onPress={() => navigation.navigate("Menu")} style={{marginTop:50}}>go back</Text> */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Menu")} >
                    <View style={{marginTop:50,marginLeft:15,width:35}}>
                    <Ionicons name="caret-back-circle-outline" size={30} color="black" />
                    </View>
                    
                </TouchableWithoutFeedback>
            
                {/* First block */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Where is the visit taking place ?</Text>
                    <View style={styles.adressInput}>
                        <AntDesign name="search1" size={20} style={{marginTop:13}}/>
                        <Autocomplete3 setAddress={setAddress} isErasingAll={isErasingAll} setIsCity={setIsCity} 
                        setIsStreetName={setIsStreetName} setIsStreetNumber={setIsStreetNumber} handleSelection={handleSelection}></Autocomplete3>
                    </View>
                    <View style={{marginTop:4}}>
                        {(!isCity || !isStreetName || !isStreetNumber) && <Text style={styles.necessaryInfoText}>Please Provide :</Text>}
                        {!isCity && <Text style={styles.necessaryInfoText}>City</Text>}
                        {!isStreetName && <Text style={styles.necessaryInfoText}>Street Name</Text>}
                        {!isStreetNumber && <Text style={styles.necessaryInfoText}>Street Number</Text>}
                    </View>
                    
                    <FlatList data={accomodationOption} horizontal={true}
                        renderItem={({item}) => (
                            <TouchableOpacity style={[styles.accomodationType,{borderColor : accomodationSelected == item.text ? "blue":"black", backgroundColor :accomodationSelected == item.text ? "#2acced":"white" }]} 
                                            onPressIn={() => handleAccommodationSelected(item.text)} on>
                                
                                {item.icon}
                                <Text style={styles.accomodationText}> {item.text}</Text>
                            </TouchableOpacity>
                            )}
                    />
                </View>
                

                {/* Second block */}
                {selectedDate && <View style={styles.section}>
                <Text style={styles.sectionTitle}>When do you need information ?</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => handleTomorrow(1)}>
                        {tomorrow && <Text style={[styles.dateOption,{borderColor : isSameDate(selectedDate,tomorrow) ? "blue":"black"}]} >Tomorrow</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTomorrow(2)}>
                        {inTwoDays && <Text style={[styles.dateOption,{borderColor : isSameDate(selectedDate,inTwoDays) ? "blue":"black"}]}>{dateToString(inTwoDays)}</Text>}                    
                    </TouchableOpacity>
                    
                    <View>
                        <AntDesign name="calendar" size={45} style={styles.icon} onPress={showDatePicker}/>
                        {selectedDate && <Text>{dateToString(selectedDate)} </Text>}
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                        date = {inThreeDays}
                        display = "inline"
                        minimumDate={inThreeDays}
                    />
                    
                    </View>
                </View>}


                {/* Third Block */}
                
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <TextInput placeholder="Describe here what you would expect from your trusty" placeholderTextColor={"gray"} value={description} onChangeText={setDescription} multiline></TextInput>
                    </View>

            </KeyboardAwareScrollView>
            
            {selectedDate ? <Footer eraseAll={eraseAll} navigation={navigation} addressInfo={address} date={dateToString(selectedDate)} description={description}></Footer> : null}
        </View>
        
        

    )
}

function Footer(props){
    return(
        <View style={styles.footer}>
            <Text style={styles.footerEraseAll} onPress={props.eraseAll}>
                Erase all
            </Text>
            <TouchableWithoutFeedback onPress={() => {
                console.log(props.addressInfo)
                if(props.addressInfo && props.date){
                    props.navigation.navigate("PostPreview",{postInformation : props.addressInfo, date: props.date,
                                                    description : props.description, isJustPreview : true})
                }
                
                }}>
                <View style={styles.footerPreview} >
                    <MaterialIcons name="preview" size={24} color="black" />
                    <Text style={{fontSize:"20",marginLeft:5}}>Preview</Text>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignSelf: 'stretch',
        backgroundColor:"#AEF4DF",
        flex:1
    },

    section:{
        backgroundColor:"white",
        margin:20,
        borderRadius:20,
        padding:18,
    },

    sectionTitle : {
        fontSize:20,
        marginBottom: 20,
    },

    adressInput : {
        padding:10,
        borderColor : "solid",
        borderStyle:"solid",
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
        flexDirection:"row",

    },

    accomodationType : {
        padding:15,
        borderColor : "solid",
        borderStyle:"solid",
        borderWidth:1,
        borderRadius:10,
        marginTop:20,
        flexDirection:"column",
        marginRight:20,
    },

    icon : {
        textAlign:"center",
    },

    accomodationText : {
        fontSize:15,
        marginTop:5,
    },

    dateOption : {
        padding:15,
        borderColor : "solid",
        borderStyle:"solid",
        borderWidth:1,
        borderRadius:10,
        flexDirection:"column",
        marginRight:20,
        height:50
    },

    postButton : {
        backgroundColor : "orange",
        borderRadius : 10,
        padding : 10,

    },

    footer : {
        backgroundColor : "white",
        flexDirection : "row",
        padding : 10,
        justifyContent:"space-between",
        height:90,
        position:"relative",
        bottom:0,
        alignItems:"center"
    },

    footerPreview : {
        flexDirection:"row", 
        backgroundColor:"#FFCB66",
        padding:10,
        borderRadius:10,
        marginRight:20,
        marginBottom:20,
    },

    footerEraseAll : {
        marginRight:20,
        marginBottom:20,
        fontSize:"20", 
        textDecorationLine:"underline",

    },

    necessaryInfoText : {
        color:"red",
        fontSize:10
    },

})