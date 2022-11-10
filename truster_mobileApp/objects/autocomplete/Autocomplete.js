import React from "react";
import { ScrollView, TextInput, View, StyleSheet, Text, SafeAreaView } from "react-native";
// import { GoogleAutoComplete } from "react-native-google-autocomplete";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import LocationItem from "./LocationItem";


const Autocomplete = () => {

    const API_KEY = "AIzaSyBXu9oJOuKZxDjUMJl8c5LgDcy3pX_QlCU" // A STOCKER PLUS TARD DANS FIREBASE

    return ( 
        <ScrollView>
            {/* <GoogleAutoComplete
                apiKey="AIzaSyBXu9oJOuKZxDjUMJl8c5LgDcy3pX_QlCU"
            >
                {({ handleTextChange, locationResults, fetchDetails}) => {
                    return <React.Fragment>
                        <View>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search a place" 
                                onChangeText={handleTextChange}
                            />
                        </View>
                        <ScrollView>
                            {locationResults.map(el => {
                                <LocationItem
                                    {...el}
                                    key={el.id} 
                                />
                            })}
                        </ScrollView>
                    </React.Fragment>
                }}
            </GoogleAutoComplete> */}
            <GooglePlacesAutocomplete 
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                  this.setState(
                            {
                              address: data.description, // selected address
                              coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}` // selected coordinates
                            }
                          );
                }}
          
                getDefaultValue={() => ''}
          
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: API_KEY,
                  language: 'en', // language of the results
          
                }}
          
                styles={{
                  textInputContainer: {
                    width: '100%'
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}
          
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
                }}
          
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                // predefinedPlaces={[homePlace, workPlace]}
          
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderRightButton={() => <Text>Custom text after the input</Text>}
                requestUrl={{
                    url: "https://maps.googleapis.com/maps/api",
                    useOnPlatform: "all",
                }}
            />
        </ScrollView>
     );
}
 
export default Autocomplete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        height: 40,
        width: 300,
        borderWidth: 1
    }
})