import { useContext } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Image } from 'react-native';
import { UserContext } from '../context';
import useSharedEffect from '../hooks/useSharedEffect';

export default function Menu({navigation}) {

  const {user,setUser} = useContext(UserContext);
  // const navigation = useNavigation()

  useSharedEffect(setUser,navigation);

  return (
    <View style={styles.container}>
      <View>
                
                
        <Image style={{
          display:'block',
          marginLeft:'auto',
          marginRight:'auto',
          marginBottom:50,
          width:350,
          height:45
        }}
        source={require('../assets/pictures/logo.png')}
        />
      </View>
            
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('MapSearchVisit');
      }}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Make a Visit</Text>
          <Text style={styles.buttonDescription}>You want to visit an apartment ?</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('VisitForm');
      }}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Ask for a Visit</Text>
          <Text style={styles.buttonDescription}>You are looking for someone to trust with your visit ?</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    height:'auto',
    alignSelf: 'stretch',
    marginTop : 150,
  },

  title : {
    fontSize:40,
    textAlign:'center'
  },

  button : {
    backgroundColor : '#c8f1e5',
    padding:16,
    height:150,
    margin:20,
    borderRadius:20,
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
  },

  buttonTitle : {
    fontSize:30,
    padding:15,
    textAlign:'center',
  },

  buttonDescription : {
    color:'#7c7c7c',
    textAlign:'center',
    fontSize:16,
  }
});
  
