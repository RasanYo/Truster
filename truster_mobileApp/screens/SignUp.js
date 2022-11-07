import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { UserContext } from "../App";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import { FirebaseError } from "firebase/app";

export default function SignUp({navigation,parameters}){
    const {user} = useContext(UserContext)

    const {emailGiven} = parameters.params

    const [userState, setUserState] = useState({
        gender: "Others",
        firstName: "",
        lastName: "",
        birthdate: "",
        email: emailGiven.params,
        password: "",
        passwordConfirmation: "",
        aboutMe: "Pas besoin mec",
        picture: null,
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateSelected,setDateSelected] = useState(new Date())
    const [showPassword,setShowPassword] = useState(true)
    const [showPasswordConfirmation,setShowPasswordConfirmation] = useState(false)

    useEffect(() => {

    },[])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
    const handleDateConfirm = (date) => {
        setDateSelected(date)
        setUserState(existingValues => ({
            ...existingValues,
            birthdate: dateToString(date)
        }))
        hideDatePicker();
      };

    const dateToString = (date) => {
        var day = date.getDate()
        var month = date.getMonth() + 1; //Current Month
        var year = date.getFullYear(); //Current Year
        return day + '/' + month + '/' + year
    }

    const setFirstName = text => {
        setUserState(existingValues => ({
            ...existingValues,
            firstName : text
        }))
    }
    const setLastName = text => {
        setUserState(existingValues => ({
            ...existingValues,
            lastName : text
        }))
    }

    const setEmail = text => {
        setUserState(existingValues => ({
            ...existingValues,
            email : text
        }))
    }

    const setPassword = text => {
        setUserState(existingValues => ({
            ...existingValues,
            password : text
        }))
    }
    
    const setPasswordConfirmation = text => {
        setUserState(existingValues => ({
            ...existingValues,
            passwordConfirmation : text
        }))
    }

    const submitUser = (e) => {
        e.preventDefault()
        if (userState.password === userState.passwordConfirmation) {
            user.signup(userState)
                .then(() => {
                    console.log("Account created")
                    navigation.navigate("Menu")
                })
                .catch(err => {
                    if (err instanceof FirebaseError) {
                        if (err.code === "auth/email-already-in-use") {
                            console.log("there is already someone with this email adress")
                        }
                        else{
                            console.log("c'est chaud la frr")
                        }
                    } else {
                        console.log(err)
                    }
            })
        } else {
            console.log("Not same password")
            return false
        }
    }

    return (
        <View>
                <View style={{height:"100%",width:"100%",backgroundColor:"beige",padding:10}}>
                    <View style={styles.componentStyle}>
                        {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                        <TextInput placeholder="Adresse email" value={userState.email} style={styles.text} onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false}></TextInput>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <View style={[styles.componentStyle,{marginRight:5,flex:1}]}>
                            {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                            <TextInput placeholder="First Name" value={userState.firstName} style={styles.text} onChangeText={text => setFirstName(text)} autoCorrect={false}></TextInput>
                        </View>
                        <View style={[styles.componentStyle,{marginRight:0,flex:1}]}>
                            {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                            <TextInput placeholder="Last Name" value={userState.lastName} style={styles.text} onChangeText={text => setLastName(text)} autoCorrect={false}></TextInput>
                        </View>
                    </View>
                    
                    <View style={[styles.componentStyle,{flexDirection:"row",justifyContent:"space-between"}]}>
                        {console.log(userState.password)}
                        <TextInput clearTextOnFocus={false} placeholder="Password" value={userState.password} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPassword(text)} secureTextEntry={showPassword} autoCapitalize="none" autoCorrect={false}></TextInput>
                        {showPassword ? 
                        <Ionicons name="ios-eye-off-outline" size={24} color="black" onPress={() => {setShowPassword(false)}}/> : 
                        <Ionicons name="eye-outline" size={24} color="black" onPress={() => setShowPassword(true)}/>}
                    </View>
                    <View style={[styles.componentStyle,{flexDirection:"row",justifyContent:"space-between"}]}>
                        <TextInput placeholder="Password Confirmation" value={userState.passwordConfirmation} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPasswordConfirmation(text)} autoCapitalize="none" autoCorrect={false}></TextInput>
                        {showPasswordConfirmation && <Ionicons name="ios-eye-off-outline" size={24} color="black" onPress={() => setShowPasswordConfirmation(false)}/>}
                        {!showPasswordConfirmation && <Ionicons name="eye-outline" size={24} color="black" onPress={() => setShowPasswordConfirmation(true)}/>}
                    </View>

                    <View>
                        <Text onPress={showDatePicker}>Birth date : </Text>
                        {<Text>{userState.birthdate}</Text>}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                            date = {dateSelected}
                            display = "inline"
                            // minimumDate={inThreeDays}
                        />
                    </View>
                    <View style={[styles.componentStyle,{backgroundColor: "#FFCB66",}]}>
                        <Text style={{textAlign:"center",fontSize:17,}} onPress={submitUser}>
                            Create account
                        </Text>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle : {
        width:"100%",
        marginTop:30,
        // marginHorizontal:20,
        padding:10,
        // backgroundColor:"red",
        borderColor:"gray",
        borderWidth:1,
        borderRadius:7,
        height:50,
        justifyContent:"center",
    },

    text : {
        marginLeft:10,
        fontSize:17
    }
})