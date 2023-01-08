import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { UserContext } from "../context";
import { Post } from "../objects/Post";
import defaultPic from "../assets/pictures/no-profile-pic.png";
import { AntDesign } from '@expo/vector-icons';

// import { MaterialIcons } from '@expo/vector-icons';


const PostScreen = (props) => {

    const navigation = props.navigation
    const {user} = useContext(UserContext)
    const {post, isJustPreview} = props.route.params

    console.log(post)

    const [poster, setPoster] = useState({
        firstName: "Trustable",
        lastName: "Trustee"
    })
    const [profilePic, setProfilePic] = useState(null)
    const [userData, setUserData] = useState()

    useEffect(() => {
        console.log("BIG CHECK")
        if (isJustPreview) {
            if(user.isLoggedIn()){
                user.getPersonalInformation().then(snapshot => {
                    setUserData(snapshot.data())
                }).then(() => {
                    console.log("USER", userData)
                    console.log("ADDRESS", post.address)
                    console.log("DESCRIPTION", post.description)
                })
                .catch(err => {
                    console.log("ERROR: ", err)
                })
            }else {
                setUserData({
                    firstName : "You",
                    lastName : "X"
                })
            }
        } else {
            user.getUser(post.creatorUID).then(data => {
                setPoster(data)
            })
            user.getProfilePictureURL(post.creatorUID).then(url => {
                setProfilePic(url)
                console.log("PP", profilePic)
            })
            .catch(err => console.log(err))
        }
        
    }, [])

    const coordinate = {
        latitude : post.address.lat,
        longitude : post.address.lng
    } 

    const onRequest = e => {
        // e.preventDefault()
        // setShowErrors(true)
        console.log("pas prevent default")
        if(!user.isLoggedIn()){
            navigation.navigate("LoginMenu")
        }else{
            console.log("connecté")
            // const p = new Post(post.address, post.timeframe, post.description, user.getUID())
            // user.post(p).then(() => navigation.goBack(null)).then(() => console.log("Successfully posted"))
            user.requestVisit(post.id).then(() => {
                navigation.pop()
                console.log("Successfully requested")
            })
        }
        
    }

    const onPost = () => {
        console.log("pas prevent default")
        if(!user.isLoggedIn()){
            navigation.navigate("LoginMenu")
        }else{
            console.log("connecté")
            const p = new Post(post.address, post.timeframe, post.description, user.getUID())
            user.post(p).then(() => navigation.navigate("Menu")).then(() => console.log("Successfully posted"))
        }
    }

    const handleChat = () => {
        navigation.navigate('Chat', {receiverID: poster.uid})
    }

    return ( 
        <View style={{flex: 1}}>
            {poster && <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={{
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                        }}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        zoomEnabled={false}                        
                    >
                        <Marker
                            // key={index}
                            coordinate={coordinate}
                            title={post.address.fullAddress}
                            description={"marker.description"}
                            pinColor="#29ECB1"
                        />
                    </MapView>
                    <View style={styles.posterContainer}>
                        <View>
                            <Image 
                                style={{height: 40, width: 40, borderRadius: 50, marginRight: 10}} 
                                source={profilePic ? {uri: profilePic} : defaultPic}
                            />
                        </View>
                        <View>
                            <Text style={{color: '#0400007c', fontSize: 12}}>Poster</Text>
                            <Text style={{fontSize: 18, marginRight: 15}}>{poster.firstName} {poster.lastName.charAt(0)}.</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <AntDesign name="staro" size={24} color="yellow" />
                            <AntDesign name="staro" size={24} color="yellow" />
                            <AntDesign name="staro" size={24} color="yellow" />
                            <AntDesign name="staro" size={24} color="yellow" />
                            <AntDesign name="staro" size={24} color="yellow" />
                        </View>
                    </View>                                                             
                </View>
                <TouchableWithoutFeedback onPress={handleChat}>
                    <Text>Chat</Text>
                </TouchableWithoutFeedback>
                <View style={styles.infoContainer}>
                    <Text style={{fontSize: 24}}>{post.address.city}</Text>
                    <Text style={{fontSize: 18, color: '#bfbfbfbf', marginBottom: 15}}>{post.address.npa} {post.address.city}, {post.address.country}</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>{post.timeframe.start}  -  {post.timeframe.end}</Text>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Description</Text>
                    <Text style={{marginBottom: 20}}>{post.description || "No description"}</Text>
                    <Text style={{fontSize: 22}}>Send Request</Text>
                    {!isJustPreview && <TextInput placeholder="Additional information" style={styles.sendRequestText} multiline={true}></TextInput>}
                </View>
                
            </ScrollView>}
            <Footer navigation={navigation} onSubmit={isJustPreview ? onPost : onRequest} isJustPreview={isJustPreview}></Footer>
        </View>
     );
}
 
export default PostScreen;

function Footer(props){
    return(
        <View style={styles.footer}>
            <Text style={styles.footerEraseAll} onPress={() => props.navigation.pop()}>
                Go back
            </Text>
            <TouchableWithoutFeedback onPress={props.onSubmit}>
                <View style={styles.footerPreview} >
                    {/* <Material name="add-to-photos" size={24} color="black" /> */}
                    <Text style={{fontSize: 20,marginLeft:5, justifyContent: 'center'}}>{props.isJustPreview? "Post" : "Request"}<AntDesign name="right" size={20} color="black"/></Text>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#EBEBEB',
        paddingBottom: 70
    },

    mapContainer: {
        // marginBottom: 50,
    },

    map: {
        width: "100%",
        height: 400,
        // zIndex: 999
    },

    posterContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#AEF4DF',
        marginHorizontal: 50,
        position: 'relative',
        top: -30,

        borderRadius: 10,
        alignItems: 'center',
        padding: 10,

        // zIndex: 1
    },


    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20
    },

    backButton: {
        position: 'absolute',
        top: 50,
        left: 50,
        zIndex: 0
    },
    footer : {
        backgroundColor : "white",
        flexDirection : "row",
        
        position:"absolute",
        bottom:0,
        width: "100%",        
        height: 70,

        // padding : 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        justifyContent:"space-between",
        alignItems:"center",

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    footerPreview : {
        flexDirection:"row", 
        backgroundColor:"#FFCB66",
        padding:10,
        borderRadius:10,
        marginRight:20,
        // marginBottom:20,
    },

    footerEraseAll : {
        // marginRight:20,
        // marginBottom:20,
        fontSize: 20, 
        textDecorationLine:"underline",

    },
    sendRequestText : {
        backgroundColor:"#E0DFDF",
        borderRadius:10,
        marginTop:10,
        height:200,
        borderWidth:1,
        textAlignVertical: "top",
        padding:8,
        marginBottom:100
    },
})