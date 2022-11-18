import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


export default function Autocomplete3({setAddress,isErasingAll}){
    const ref = useRef()
    // const [newAdress, setNewAdress] = useState("")
    const handleSelection = (data,details) => {
        var geo = details.geometry.location
        var t = details.address_components
        // console.log(t)
        var newAdress = {}

        newAdress.lat = geo.lat
        newAdress.lng = geo.lng
        newAdress.fullAdress = details.formatted_address

        t.forEach(x => {
            if(x.types.includes("street_number")){
                newAdress.number = x.long_name
            }else if(x.types.includes("route")){
                newAdress.street = x.long_name
            }else if(x.types.includes("postal_code")){
                newAdress.npa = x.long_name
            }else if(x.types.includes("country")){
                newAdress.country = x.long_name
            }else if(x.types.includes("locality")){
                newAdress.city = x.long_name
            }
        })
        console.log(newAdress)
        if(Object.getOwnPropertyNames(newAdress).length != 8){
            console.log("Information missing")
        }else{
            setAddress(newAdress)
        }
        }

    useEffect(() => {
        if(isErasingAll){
            console.log("should erase everything")
            ref.current.clear()

        }
    },[isErasingAll])

    return (
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Type address"
            query={{key: "AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4"}}
            fetchDetails={true}
            onPress={handleSelection}

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