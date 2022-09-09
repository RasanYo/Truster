import {useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function Autocomplete({textObj, setStreet, setCity, setNpa, setCountry, setFullAdress, searchOptions, setNumber, setLocation, setLat,setLng}) {
  const [address, setAddress] = useState("");

  // useEffect(()=>{

  // })

  const handleSelect = (val) => {
      setAddress(val)
      setFullAdress(val)
      if(searchOptions === undefined){
        
        

        geocodeByAddress(val).then(results => {
          getLatLng(results[0]).then(x => setLocation([val,x.lat,x.lng]))
        })
        
        setNumber(null)
        setStreet(null)
        setCity(null)
        setCountry(null)
        setNpa(null)
      } 
      
      geocodeByAddress(val).then(x => {
        // console.log(x[0].address_components)
        x[0].address_components.forEach(y => {
          if(y.types[0] === "route"){
            setStreet(y.long_name)
            // console.log("route")
          }else if(y.types[0] === "country"){
            setCountry(y.long_name)
            // console.log("country")
          }else if(y.types[0] === "locality"){
            setCity(y.long_name)
            // console.log("locality")
          }else if(y.types[0] === "postal_code"){
            setNpa(y.long_name)
            // console.log("postal_code")
          }else if(y.types[0] === "street_number"){
            setNumber(y.long_name)
            // console.log("street_number")
          }
        })
      })
      
      //geocodeByAddress(val).then(x => setCity(x[0].address_components[0]))
      
      
  }

  return (
    <div className="inputBox">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-block">
            <input {...getInputProps({ placeholder: textObj.text,className: 'location-search-input'})} />

            <div className="autocomplete-dropdown-container">
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#cef8eb",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })} key={index} >
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