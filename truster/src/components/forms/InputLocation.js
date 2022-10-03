import { useState } from "react";
import "../../styles/inputField.css"
import AutoComplete from "../AutoComplete";


const InputLocation = ({ 
    id=null,
    logo="null", 
}) => {
    const [address,setAddress] = useState("")
    return ( 
        
        <div className="input-field" id={id}>
            <span>
                {logo}
            </span>
            
            <AutoComplete
                        setAddress={setAddress}
                        neccessaryDetails={['locality', 'country']}
                        inputProps={{placeholder: "Type address", className: 'location-search-input max-width', required: true}}
                        searchOptions={{types : ['locality','country']}}
                        className="autocomplete-dropdown-container"
                        
            />
        </div>
     );
}
 
export default InputLocation;