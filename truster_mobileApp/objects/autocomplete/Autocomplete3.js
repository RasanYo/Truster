import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


export default function Autocomplete3({setAddress,isErasingAll,setIsCity,setIsStreetName,handleSelection,setIsStreetNumber,placeholder="Type address",isFocus=false}){
    const ref = useRef()
    // const [newAdress, setNewAdress] = useState("")

    useEffect(() => {
        if(isErasingAll){
            console.log("should erase everything")
            ref.current.clear()
            setIsCity(false)
            setIsStreetName(false)
            setIsStreetNumber(false)
            setAddress(null)
        }
    },[isErasingAll])

    // const isFocus = false

    return (
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={placeholder}
            query={{key: "AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4",language:"en"}}
            fetchDetails={true}
            onPress={handleSelection}
            // disableScroll={true}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            listEmptyComponent={() => (
                <View style={{flex: 1}}>
                    <Text>No results were found</Text>
                </View>
            )}
            textInputProps={{
                placeholderTextColor:"gray",
                autoCorrect : false,
                autoFocus:isFocus,
            }}
            styles={{
                // listView : {
                    // marginLeft:-30,
                // }
                // listViewContainer: {
                //     position: 'absolute',
                //     zIndex: 100,
                //     elevation: 3,
                //     top: 30,
                //     paddingHorizontal: 15,
                // },

            }}
          />
      );

}