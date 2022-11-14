import { Text, View } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


export default function Autocomplete3({setAddress}){



    return (
          <GooglePlacesAutocomplete
            placeholder="Type address"
            query={{key: "AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4"}}
            onPress={(data, details = null) => console.log(details.terms, details)}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            listEmptyComponent={() => (
                <View style={{flex: 1}}>
                    <Text>No results were found</Text>
                </View>
                )}
            textInputProps={{
                autoCorrect : false
            }}
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