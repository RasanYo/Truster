import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import Autocomplete from '../objects/Autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import triggerActionSheet from '../hooks/triggerActionSheet';


export default function AddressInput({
  handleSelection,
  isInputClicked, setIsInputClicked
}) {


  return (
    <View style={styles.searchBar}>
      <AntDesign name="search1" size={24} style={{alignSelf:'flex-start',marginTop:15}}/>
      {isInputClicked ? 
        <View style={styles.searchBarContainer}>
          <Autocomplete 
            setAddress={() => {}} 
            isErasingAll={() => {}} 
            setIsCity={() => {}}
            setIsStreetName={() => {}} 
            setIsStreetNumber={() => {}} 
            placeholder="" 
            isFocus={true} 
            handleSelection={handleSelection}>
          </Autocomplete>
        </View> :  
        <TouchableWithoutFeedback onPress={() => setIsInputClicked(true)}>
          <View style={{marginVertical:4}}>
            <Text style={{fontSize:17}}>Where do you live</Text>
            <Text style={{color:'gray'}}>Look for visits in your area</Text>
          </View>
        </TouchableWithoutFeedback>}
            
    </View>
  );
                  
}

const styles = StyleSheet.create({
  searchBar : {
    position: 'relative',
    backgroundColor: 'white',
    width: 350,
    height: 70,
    padding: 10,
    borderRadius : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchBarContainer: {
    position: 'absolute',
    zIndex:100,
    top: 11,
    left : 40,
    width:300,
  },
});