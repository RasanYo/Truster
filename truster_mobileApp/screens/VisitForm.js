import { useEffect, useState } from "react"
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import {AntDesign} from "@expo/vector-icons"
import {FontAwesome} from "@expo/vector-icons"
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default function VisitForm({navigation}){
    const [adress,setAdress] = useState("")
    const [accomodationSelected,setAccomodationSelected] = useState(null)
    const [tomorrow, setTomorrow] = useState('');
    const [inTwoDays, setInTwoDays] = useState('');
    const [inThreeDays, setInThreeDays] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState();

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
    }, []);

    // const onSubmit = e => {
    //     e.preventDefault()
    //     setShowErrors(true)
    //     if (!address || new Date(timeframe.start).getTime() > new Date(timeframe.end).getTime()) return false
    //     else {
    //         const post = new Post(address, timeframe, description, user.getUID())
    //         user.post(post).then(() => console.log("Successfully posted"))
    //     }
    // }

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

    return(
        
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate("Menu")} style={{marginTop:50}}>go back</Text>
           
            {/* First block */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Where is the visit taking place ?</Text>
                <View style={styles.adressInput}>
                    <AntDesign name="search1" size={20}/>
                    <TextInput placeholder="Type adress" value={adress} onChangeText={setAdress} style={{marginLeft:10,fontSize:17}}></TextInput>
                </View>
                
                <FlatList data={accomodationOption} horizontal={true}
                    renderItem={({item}) => (
                        <TouchableOpacity style={[styles.accomodationType,{borderColor : accomodationSelected == item.text ? "blue":"black", backgroundColor :accomodationSelected == item.text ? "#2acced":"white" }]} 
                                        onPressIn={() => handleAccommodationSelected(item.text)} on>
                            
                            {item.icon}
                            <Text style={styles.accomodationText}> {item.text}</Text>
                        </TouchableOpacity>)}
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
                <TextInput placeholder="Describe here what you would expect from your trusty"></TextInput>
            </View>
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
        padding:15,
        borderColor : "solid",
        borderStyle:"solid",
        borderWidth:1,
        borderRadius:10,
        marginTop:20,
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
    }
})