import { useContext, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { UserContext } from "../App";

export default function SignUp(){
    const {user} = useContext(UserContext)

    const [userState, setUserState] = useState({
        gender: "Others",
        firstName: "Menelik",
        lastName: "Nouvellon",
        birthdate: "01/09/02",
        email: "meneliknouvellon@gmail.com",
        password: "Menelik4485",
        passwordConfirmation: "Menelik4485",
        aboutMe: "Pas besoin mec",
        picture: null,
    })

    const submitUser = (e) => {
        e.preventDefault()
        if (userState.password === userState.passwordConfirmation) {
            user.signup(userState)
                .then(() => {
                    console.log("Account created")
                })
                .catch(err => {
                    if (err instanceof FirebaseError) {
                        if (err.code === "auth/email-already-in-use") {
                            console.log("there is already someone with this email adress")
                        }
                    } else {
                        console.log(err)
                    }
            })
        } else {
            return false
        }
    }

    const handleChange = ( text,name) => {
        console.log(text)
        console.log(name)
        let newUser = userState
        newUser[name] = text
        setUserState(newUser)
    }

    const setFirstName = text => {
        setUserState(existingValues => ({
            ...existingValues,
            firstName : text
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

    return (
        <View>
            <Text onPress={submitUser}>
                Sign up
            </Text>
            {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput>
            <TextInput placeholder="email" value={userState.email} style={{marginLeft:10,fontSize:17}} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput placeholder="password" value={userState.password} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPassword(text)}></TextInput>
            <TextInput placeholder="passwordconfirmation" value={userState.passwordConfirmation} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPasswordConfirmation(text)}></TextInput> */}
            
        </View>
    )
}