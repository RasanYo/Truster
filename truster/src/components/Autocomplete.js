import { useContext } from "react";
import {useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { ErrorToastContext } from "../App";

const AutoComplete = ({
    setAddress,
    inputProps={},
    searchOptions={types: ['street_number', 'route', 'locality', 'postal_code', 'country']},
    neccessaryDetails=['route', 'locality', 'country'],
    className = "dropdown"
}) => {

    const [displayAddress, setDisplayAddress] = useState("")
    const displayErrorToast = useContext(ErrorToastContext)

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        var city
        var country
        var givenInputs = []
        console.log(results[0])
        results[0]
            .address_components
            .forEach(component => {
                givenInputs.push(component.types[0])
                if (component.types[0] === 'locality') city = component.long_name
                if (component.types[0] === 'country') country = component.long_name
            })

        if (!neccessaryDetails.every(necessity => givenInputs.includes(necessity))) {
            displayErrorToast(`You need to give at least the following information: ${neccessaryDetails.join(', ')}`)
            return false
        }

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

                        <div className={className}>
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
 
export default AutoComplete;