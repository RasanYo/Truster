import { useState } from "react";
import "../styles/inputField.css"
import AutoComplete from "./Autocomplete";


const InputLocation = ({ 
    id=null,
    value, 
    setValue, 
    inputType='text', 
    placeholder="", 
    logo="null", 
    title=null
}) => {
    const [city,setCity] = useState("");
    const [country, setCountry] = useState("");
    const [address,setAddress] = useState("")
    return ( 
        
        <div className="input-field" id={id}>
            <span>
                {logo}
            </span>
            

            <AutoComplete textObj={{text : placeholder}} setCity={setCity} setCountry={setCountry} setFullAdress={setAddress} searchOptions={{types : ['locality','country']}}/>
            

            {/* <div>
                {title && <h4>{title}</h4>}
                <input 
                    type={inputType} 
                    value={value}
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                />
            </div> */}
        </div>
     );
}
 
export default InputLocation;