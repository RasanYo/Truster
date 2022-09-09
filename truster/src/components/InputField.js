import { useState } from "react";
import "../styles/inputField.css"
import AutoComplete from "./Autocomplete";

const InputField = ({ value, setValue, inputType='text', placeholder="", logo="null"}) => {

    const [country,setCountry] = useState("");
    const [city, setCity] = useState("");
    const [adress,setAddress] = useState("");


    return ( 
        <div className="input-field">
            <span>
                {logo}
            </span>
            

            <AutoComplete textObj={{text : placeholder}} setCity={setCity} setCountry={setCountry} setFullAdress={setAddress} searchOptions={{types : ['locality','country']}}/>
            {/* <input 
                type={inputType} 
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
            /> */}
            
        </div>
     );
}
 
export default InputField;