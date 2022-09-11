import { useMemo } from "react"
import "../styles/forminput.css"

const FormInput = ({
    title, 
    value, 
    setValue, 
    inputType, 
    className="", 
    required=false,
    errorMessage=`*Invalid ${title.toLowerCase()}`,
    validity=() => {return value.length > 0}
}) => {

    const handleChange = e => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const validInput = useMemo(() => validity(), [value])

    return ( 
        <div className={`input-container ${className}`}>
            <label>
                <h5>{title}</h5>
                {required ? 
                <input 
                    type={inputType}
                    value={value}
                    onChange={handleChange}
                    required
                /> :
                <input 
                    type={inputType}
                    value={value}
                    onChange={handleChange}
                />}
            </label>
            {required && !validInput &&
            <h6 className="err-msg">{errorMessage}</h6>
            }
        </div>
     );
}
 
export default FormInput;