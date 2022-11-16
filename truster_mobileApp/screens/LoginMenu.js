import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { UserContext } from "../App";
import { auth } from "../firebase";


export default function LoginMenu({navigation}){
    const {user} = useContext(UserContext)
    const [isLoggingIn,setIsLoggingIn] = useState(false)

    const [userState, setUserState] = useState({
        gender: "Others",
        firstName: "Menelik",
        lastName: "Nouvellon",
        birthdate: "01/09/02",
        email: "",
        password: "",
        passwordConfirmation: "",
        aboutMe: "Pas besoin mec",
        picture: null,
    })

    const loginOrSignUp = (email) => {
        user.userExistsByEmail(email).then(bool => {
            //Si un compte existe déjà, log in
            if(isLoggingIn == true){
                login(email,userState.password)
            }
            if(bool){
                setIsLoggingIn(true)
            }
            //Sinon sign up
            else{
                navigation.navigate("SignUp",{emailGiven : "email"})
            }
        })

    }

    const login = (email,password) => {
        // console.log(user)
        user.login(email, password).then(() => console.log("logged in"))
            .then(() => navigate("/"))
            .catch(error => {
                console.log(error.message)
            })
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

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth,"meneliknouvellon.pro@gmail.com","Mene4485")
        .then(userCredentials => {
            const user = userCredentials.user
            console.log(user)
        })
        .catch(err => alert(err.message))
    }

    return (
        <View>
            <View>
                <View style={styles.componentStyle}>
                    {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                    <TextInput placeholder="Adresse email" value={userState.email} style={styles.text} onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} onChange={() => setIsLoggingIn(false)} autoComplete="email" keyboardType="email-address" textContentType="emailAddress"></TextInput>
                </View>
                {isLoggingIn && <View style={styles.componentStyle}>
                    <TextInput placeholder="password" value={userState.password} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPassword(text)} autoCapitalize="none" autoCorrect={false}></TextInput>
                </View>}
                <View style={[styles.componentStyle,{backgroundColor: userState.email.length == 0 ? "#c4c4c4" : "#FFCB66",}]}>
                    <Text style={{textAlign:"center",fontSize:17,}} onPress={() => loginOrSignUp(userState.email)}>
                        Continue
                    </Text>
                </View>
                
            </View>
            <View style={{marginTop:50,}}>
                    <Text>
                        Continue with : 
                    </Text>
                <View style={styles.componentStyle}>  
                    <Text style={{textAlign:"center"}}>Google</Text>
                </View>
                <View style={styles.componentStyle}>  
                    <Text style={{textAlign:"center"}}>Apple</Text>
                </View>
                <View style={styles.componentStyle}>  
                    <Text style={{textAlign:"center"}}>Facebook</Text>
                </View>
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle : {
        marginTop:30,
        marginHorizontal:20,
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