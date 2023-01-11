import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useFocusEffect } from "@react-navigation/native";

const PostContainer = ({post, navigation}) => {

    const {user} = useContext(UserContext)
    // const [fontsLoaded] = useFonts({
    //     'NTR': require('../assets/fonts/NTR-Regular.ttf'),
    //     'Inter-Bold' : require('../assets/fonts/Inter-Bold.ttf'),
    //     'Inter-SemiBold' : require('../assets/fonts/Inter-SemiBold.ttf'),
    //     'Inter' : require('../assets/fonts/Inter-Regular.ttf')
    //   });

    const [isFavorite, setisFavorite] = useState(false)

    useEffect(() => {
        // console.log("POSTCONTAINER", post)
        user.getPersonalInformation().then(snap => {
            setisFavorite(snap.data().myFavorites.includes(post.id))
        })
    }, [])
    
    

    return ( 
        <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('PostPreview', {post: post, isJustPreview: false})
        }}>
            <View style={{width: '100%'}}>
                {post && 
                <View style={styles.rowContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.neighborhood}>
                            {post.address.city}
                        </Text>
                        <Text style={styles.city}>
                            {post.address.fullAddress}
                        </Text>
                        <Text style={styles.timeframe}>
                            {post.timeframe.start} - {post.timeframe.end}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        {isFavorite ? 
                        <TouchableOpacity activeOpacity={1} onPress={() => {setisFavorite(false);user.removeFromFavorites(post.id)}}> 
                            <MaterialCommunityIcons name="heart" size={20} color="black"/>
                        </TouchableOpacity>
                         : 
                         <TouchableOpacity activeOpacity={1} onPress={() => {setisFavorite(true);user.addToFavorites(post.id)}}>
                            <MaterialCommunityIcons 
                                name="cards-heart-outline"
                                size={20}
                                color='#979797'
                            /> 
                         </TouchableOpacity>
                        }
                        
                        <Text style={styles.price}>{post.price} €</Text>
                        <Text style={styles.houseType}>Appartment</Text>
                    </View>
                    
                </View>}
            </View>
        </TouchableWithoutFeedback>
     );
}
 
export default PostContainer;

const styles = StyleSheet.create({

    rowContainer: {
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        borderStyle: "solid",
        borderColor: "#CACACA",
        borderWidth: 1,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "transparent"
    },

    leftContainer: {
        textAlign: "left",
        flex: 3,
        justifyContent: 'center',
        marginVertical: 10

    },
    rightContainer: {
        textAlign: "right",
        flex: 1,
        justifyContent: 'center'
    },


    neighborhood: {
        // fontFamily: 'NTR',
        fontSize: 24,
        marginBottom: 5
        // lineHeight: '0.5'
    },

    city: {
        // fontFamily: 'NTR',
        fontSize: 16,
        color: '#939393',
        marginBottom: 3
        // lineHeight: '2'
    },

    timeframe: {
        // fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        opacity: 0.85,
        // lineHeight: '0.5'
    },

    price: {
        // fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
        marginBottom: 7,
    },

    houseType: {
        // fontFamily: 'Inter-SemiBold',
        color: '#968E8E',
        opacity: 0.74,
        // lineHeight: '1'
    }
})
