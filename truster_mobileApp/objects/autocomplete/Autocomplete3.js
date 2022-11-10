import { Text, View } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


export default function Autocomplete3(){
    return (
          <GooglePlacesAutocomplete
            placeholder="Type a place"
            query={{key: "AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4"}}
            onPress={(data, details = null) => console.log(data, details)}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            listEmptyComponent={() => (
                <View style={{flex: 1}}>
                    <Text>No results were found</Text>
                </View>
                )}
            styles={{
                container : {
                    margin:0,
                    // backgroundColor:"red",
                },
                textInputContainer:{
                    // backgroundColor:"red"
                },
                textInput:{
                    // backgroundColor:"red",
                    // marginTop:0
                }
                

            }}
          />
      );

}