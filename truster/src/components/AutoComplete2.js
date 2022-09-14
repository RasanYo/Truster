import { useEffect } from "react";
import {useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const AutoComplete2 = ({
    setAddress,
    inputProps={},
    searchOptions={types: ['street_number', 'route', 'locality', 'postal_code', 'country']}
}) => {

    const [displayAddress, setDisplayAddress] = useState("")


    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        var city
        var country
        results[0]
            .address_components
            .forEach(component => {
                if (component.types[0] === 'locality') city = component.long_name
                if (component.types[0] === 'country') country = component.long_name
            })

        setDisplayAddress(results[0].formatted_address)
        getLatLng(results[0]).then(latLng => {
            setAddress({
                address: results[0].formatted_address,
                city: city,
                country: country,
                lat: latLng.lat,
                lng: latLng.lng
            })
        })
        
    }

    return ( 
        <div className="autocomplete">
            <PlacesAutocomplete
                value={displayAddress}
                onChange={setDisplayAddress}
                onSelect={handleSelect}
                searchOptions={searchOptions}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input {...getInputProps(inputProps)} />

                        <div className="dropdown">
                            {suggestions.map((suggestion, index) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#b6d6cc" : "#cef8eb",
                                    marginLeft: "4px",
                                    width: "100%",
                                    padding : "10px 10px 10px 38px",
                                    fontSize: "13px",
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })} key={index}>
                                        {suggestion.description}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

        </div>
     );
}
 
export default AutoComplete2;