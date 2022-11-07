import { Text, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

const PostContainer = ({post=null}) => {

    const [fontsLoaded] = useFonts({
        'NTR': require('../assets/fonts/NTR-Regular.ttf'),
        'Inter-Bold' : require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-SemiBold' : require('../assets/fonts/Inter-SemiBold.ttf'),
        'Inter' : require('../assets/fonts/Inter-Regular.ttf')
      });

    const styles = StyleSheet.create({

        rowContainer: {
            backgroundColor: 'white',
            display: "flex",
            flexDirection: "row",
            paddingLeft: '2rem',
            paddingRight: '2rem',
            borderStyle: "solid",
            borderColor: "#CACACA",
            borderWidth: 1,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopColor: "transparent"
        },

        leftContainer: {
            textAlign: "left",
            flex: '3',
            marginTop: '2rem',
            marginBottom: '2rem'

        },
        rightContainer: {
            textAlign: "right",
            flex: '2',
            marginTop: '1rem',
            marginBottom: '1rem'
        },


        neighborhood: {
            fontFamily: 'NTR',
            fontSize: '24px',
            lineHeight: '0.5'
        },

        city: {
            fontFamily: 'NTR',
            fontSize: '16px',
            color: '#939393',
            lineHeight: '2'
        },

        timeframe: {
            fontFamily: 'Inter-SemiBold',
            fontSize: '14px',
            opacity: '0.85',
            lineHeight: '0.5'
        },

        price: {
            fontFamily: 'Inter-SemiBold',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '4px',
            marginBottom: '7px'
        },

        houseType: {
            fontFamily: 'Inter-SemiBold',
            color: '#968E8E',
            opacity: '0.74',
            lineHeight: '1'
        }
    })

    return ( 
        <View style={{width: '100%'}}>
            {post && 
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.neighborhood}>
                        La Marne
                    </Text>
                    <Text style={styles.city}>
                        {post.address.address}
                    </Text>
                    <Text style={styles.timeframe}>
                        {post.timeframe.start} - {post.timeframe.end}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <MaterialCommunityIcons 
                        name="cards-heart-outline"
                        size={20}
                        color='#979797'
                        // style={{
                        //     lineHeight: '0'
                        // }}
                    />
                    <Text style={styles.price}>20 €</Text>
                    <Text style={styles.houseType}>Appartment</Text>
                </View>
                
            </View>}
        </View>
     );
}
 
export default PostContainer;

