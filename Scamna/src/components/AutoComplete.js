import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

// export default function Autocomplete({address,setAddress}) {
export default function Autocomplete({setStreet, setCity, setNpa, setCountry, setFullAdress}) {
  const [address, setAddress] = useState("");
  

  // const handleSelect = async value => {
  //   const results = await geocodeByAddress(value);
  //   const latLng = await getLatLng(results[0]);
  //   setAddress(value);
  //   setCoordinates(latLng);
  // };

  const handleSelect = (val) => {
      geocodeByAddress(val).then(x => {
        console.log(x[0].address_components)
        x[0].address_components.forEach(y => {
          if(y.types[0] == "route"){
            setStreet(y.long_name)
            console.log("route")
          }else if(y.types[0] == "country"){
            setCountry(y.long_name)
            console.log("country")
          }else if(y.types[0] == "locality"){
            setCity(y.long_name)
            console.log("locality")
          }else if(y.types[0] == "postal_code"){
            setNpa(y.long_name)
            console.log("postal_code")
          }

        })

      })
      
      //geocodeByAddress(val).then(x => setCity(x[0].address_components[0]))
      setAddress(val)
      setFullAdress(val)
      
  }

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })} >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}