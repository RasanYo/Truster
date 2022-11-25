import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet, Image } from "react-native";
import { UserContext } from "../context";
import { auth } from '../firebase';
import { Guest } from "../objects/Guest";
import { User } from "../objects/User";

export default function Menu({navigation}) {

    const {user,setUser} = useContext(UserContext)
    // const navigation = useNavigation()

    

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(u => {
            if (u) { 
                console.log("User is already logged in")
                setUser(new User(u.uid, u)); 
            } 
            else {
                console.log("User is not logged in")
                setUser(new Guest())
                navigation.navigate('LoginMenu');
                // navigation.navigate("LoginMenu")
            }
            unsuscribe()
        })
    }, [])

    return (
        <View style={styles.container}>
            <View>
                {/* <Image style={{
                    display:"block",
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginBottom:50,
                }}/> */}
            </View>
            
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate("MapSearchVisit")
            }}>
                <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Make a Visit</Text>
                    <Text style={styles.buttonDescription}>You want to visit an apartment ?</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate("VisitForm")
            }}>
                <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Ask for a Visit</Text>
                    <Text style={styles.buttonDescription}>You're looking for someone to trust with your visit ?</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text onPress={() => user.logout()}> Logout</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        height:"auto",
        alignSelf: 'stretch',
        // backgroundColor:"red",
        marginTop : 150,
    },

    title : {
        fontSize:40,
        textAlign:"center"
    },

    button : {
        backgroundColor : "#c8f1e5",
        padding:16,
        height:150,
        margin:20,
        borderRadius:20,
        // shadowOffset: {width: -2, height: 2},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
    },

    buttonTitle : {
        fontSize:30,
        padding:15,
        textAlign:"center",
    },

    buttonDescription : {
        color:"#7c7c7c",
        // lineHeight:"25%",
        textAlign:"center",
        fontSize:16,
    }
  });
  
