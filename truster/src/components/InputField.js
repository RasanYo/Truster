import "../styles/inputField.css"

const InputField = ({ 
    id=null,
    value, 
    setValue, 
    inputType='text', 
    placeholder="", 
    logo="null", 
    title=null
}) => {
    return ( 
        <div className="input-field" id={id}>
            <span>
                {logo}
            </span>
            <div>
                {title && <h4>{title}</h4>}
                <input 
                    type={inputType} 
                    value={value}
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </div>
     );
}
 
export default InputField;