import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useContext} from 'react';
import { UserContext } from '../context';



const PostContainer = ({post, navigation, isFavorite}) => {

  const {user} = useContext(UserContext);
  // const [fontsLoaded] = useFonts({
  //     'NTR': require('../assets/fonts/NTR-Regular.ttf'),
  //     'Inter-Bold' : require('../assets/fonts/Inter-Bold.ttf'),
  //     'Inter-SemiBold' : require('../assets/fonts/Inter-SemiBold.ttf'),
  //     'Inter' : require('../assets/fonts/Inter-Regular.ttf')
  //   });

  return ( 
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate('PostPreview', {post: post, isJustPreview: false});
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
                      <TouchableOpacity activeOpacity={1} onPress={() => {user.removeFromFavorites(post.id);}}> 
                        <MaterialCommunityIcons name="heart" size={20} color="black"/>
                      </TouchableOpacity>
                      : 
                      <TouchableOpacity activeOpacity={1} onPress={() => {
                        if(user.isLoggedIn()){
                          user.addToFavorites(post.id);
                        }else {
                          navigation.navigate('LoginMenu');
                        }
                      }}>
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
};
 
export default PostContainer;

const styles = StyleSheet.create({

  rowContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    borderStyle: 'solid',
    borderColor: '#CACACA',
    borderWidth: 1,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent'
  },

  leftContainer: {
    textAlign: 'left',
    flex: 3,
    justifyContent: 'center',
    marginVertical: 10

  },
  rightContainer: {
    textAlign: 'right',
    flex: 1,
    justifyContent: 'center'
  },


  neighborhood: {
    fontSize: 24,
    marginBottom: 5
  },

  city: {
    fontSize: 16,
    color: '#939393',
    marginBottom: 3
  },

  timeframe: {
    fontSize: 14,
    opacity: 0.85,
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 7,
  },

  houseType: {
    color: '#968E8E',
    opacity: 0.74,
  }
});
