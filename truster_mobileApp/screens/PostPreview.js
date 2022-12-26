import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { UserContext } from "../context";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import { Post } from "../objects/Post";


export default function PostPreview(props){

    const navigation = props.navigation
    const post = props.route.params.post

    const { user } = useContext(UserContext)
    const [poster, setPoster] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        user.getUser(post.creatorUID).then(data => {
            setPoster(data)
            console.log("POST", post)
        })
    }, [])

    const coordinate = {
        latitude : post.address.lat,
        longitude : post.address.lng
    }

    const isJustPreview = false

    const onSubmit = e => {
        // e.preventDefault()
        // setShowErrors(true)
        console.log("pas prevent default")
        if(!user.isLoggedIn()){
            navigation.navigate("LoginMenu")
        }else{
            console.log("connecté")
            const post = new Post(post.address, post.timeframe, post.description, user.getUID())
            user.post(post).then(() => navigation.goBack(null)).then(() => console.log("Successfully posted"))
        }
        
    }
    

    return (
        <View style={styles.container}  >
        <ScrollView >
            <MapView style={styles.map} initialRegion={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
                }}
                >
                    <Marker
                        // key={index}
                        coordinate={coordinate}
                        title={post.address.fullAdress}
                        description={"marker.description"}
                        pinColor="#29ECB1"
                        />
            </MapView>
            <View style={styles.posterInfo}>
                {/* Profile Picture  */}
                <View>
                    <Text style={{color:"gray"}}>Poster</Text>
                    {userData ? <Text style={{fontSize:20, width:140}}>{poster.firstName} {poster.lastName.charAt(0)}. </Text> : null}                
                </View>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <AntDesign name="staro" size={24} color="yellow" />
                    <AntDesign name="staro" size={24} color="yellow" />
                    <AntDesign name="staro" size={24} color="yellow" />
                    <AntDesign name="staro" size={24} color="yellow" />
                    <AntDesign name="staro" size={24} color="yellow" />
                </View>
            </View>

            <View style={{marginLeft:20, marginTop:20}}>
                <Text style={{fontSize:25,letterSpacing:0.5}}>{post.address.city}</Text>
                <Text style={{marginTop:7,color:"gray",letterSpacing:1}}>{post.address.npa} {post.address.city}, {post.address.country}</Text>
                <Text style={{marginTop:15,letterSpacing:1,fontSize:20}}>{post.timeframe.start}  -  {post.timeframe.end}</Text>
            </View>
            <View style={{margin:20}}>
                <Text style={{fontSize:20}}>Description</Text>
                {post.description ? <Text style={styles.descriptionText}>{post.description}</Text> : <Text style={styles.descriptionText}>No description</Text>}
            </View>

            <View style={{margin:20,opacity: isJustPreview ? 0.5 : 1}}>
                <Text style={{fontSize:20}}>Send Request</Text>
                {isJustPreview ? <Text style={styles.sendRequestText}>Additional information</Text>: <TextInput placeholder="Additional information" style={styles.sendRequestText} multiline={true}></TextInput>}
            </View>
        </ScrollView>
        <Footer navigation={navigation} onSubmit={onSubmit}></Footer>
        </View>
        
    )
    
}

function Footer(props){
    return(
        <View style={styles.footer}>
            <Text style={styles.footerEraseAll} onPress={() => props.navigation.pop()}>
                Go back
            </Text>
            <TouchableWithoutFeedback onPress={props.onSubmit}>
                <View style={styles.footerPreview} >
                    <MaterialIcons name="add-to-photos" size={24} color="black" />
                    <Text style={{fontSize:20,marginLeft:5}}>Post</Text>
                </View>
            </TouchableWithoutFeedback>
            
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
      height: 400,
    },

    posterInfo : {
        display:"block",
        backgroundColor:"#29ECB1",
        borderRadius : 10,
        padding:10,
        width:280,
        marginLeft:"auto",        
        marginRight:"auto",        
        marginTop:-30,
        flexDirection:"row",
        justifyContent:"space-between"
    },

    descriptionText : {
        marginTop:15,
    },

    sendRequestText : {
        backgroundColor:"#E0DFDF",
        borderRadius:10,
        marginTop:10,
        height:200,
        borderWidth:1,
        textAlignVertical: "top",
        padding:8,
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
        fontSize:20, 
        textDecorationLine:"underline",

    },
  });