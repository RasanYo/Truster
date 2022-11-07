import { Text, View, StyleSheet } from "react-native";
import PostList from "../components/PostList";
import { useFonts } from 'expo-font';
// import AutoComplete from "../components/AutoComplete";


const VisitAppartments = ({navigation}) => {

    const [fontsLoaded] = useFonts({
        'NTR': require('../assets/fonts/NTR-Regular.ttf')
      });

    const posts = [
        {
            address: {
                address: '12345 Testbourg, Testland'
            },
            timeframe: {
                start: "24/06/2023",
                end: "01/09/2023"
            }
        },
        {
            address: {
                address: '12345 Testbourg, Testland'
            },
            timeframe: {
                start: "24/06/2023",
                end: "01/09/2023"
            }
        },
        {
            address: {
                address: '12345 Testbourg, Testland'
            },
            timeframe: {
                start: "24/06/2023",
                end: "01/09/2023"
            }
        },
        {
            address: {
                address: '12345 Testbourg, Testland'
            },
            timeframe: {
                start: "24/06/2023",
                end: "01/09/2023"
            }
        }
    ]


    return ( 
        <View style={styles.mainContainer}>
            <View style={{margin: '2rem'}}>
                <Text style={styles.title}>Visit appartments,</Text>
                <Text style={styles.title2}>Make Money</Text>
            </View>
            <View>
                {/* <AutoComplete /> */}
            </View>
            <Text onPress={() => navigation.navigate("Menu")}>go back</Text>
            <PostList posts={posts}/>
        </View>
     );
}

const styles = StyleSheet.create({
    mainContainer: {
        color: '#EBEBEB'
    },

    title: {
        fontFamily: 'NTR',
        fontSize: '45px',
        lineHeight: '1.25'
    },

    title2: {
        fontFamily: 'NTR',
        fontSize: '45px',
        lineHeight: '1.25',
        color: '#00D394'
    }
})
 
export default VisitAppartments;