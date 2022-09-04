import "../styles/inputField.css"

const InputField = ({ value, setValue, inputType='text', placeholder="", logo="null"}) => {
    return ( 
        <div className="input-field">
            <span>
                {logo}
            </span>
            
            <input 
                type={inputType} 
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
            />
            
        </div>
     );
}
 
export default InputField;