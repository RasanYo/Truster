import { useContext, useEffect } from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet, Image } from "react-native";
import { UserContext } from "../App";

export default function Menu({navigation}) {
    const { user } = useContext(UserContext)

    useEffect(() => {
        if(!user.isLoggedIn()){
            navigation.navigate("LoginMenu")
        }
    },[])

    return (
        <View style={styles.container}>
            <View>
                <Image source={require("../assets/logo.png")} style={{
                    display:"block",
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginBottom:50,
                }}/>

            </View>
            
            <TouchableWithoutFeedback>
                <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Make a Visit</Text>
                    <Text style={styles.buttonDescription}>You want to visit an apartment ?</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {
                
                navigation.navigate("VisitForm")}
                } >
                <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Ask for a Visit</Text>
                    <Text style={styles.buttonDescription}>You're looking for someone to trust with your visit ?</Text>
                </View>
            </TouchableWithoutFeedback>
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
        shadowOffset: {width: -2, height: 2},  
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
        lineHeight:"25%",
        textAlign:"center",
        fontSize:16,
    }
  });
  
