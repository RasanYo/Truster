import "../styles/forminput.css"

const FormInput = ({title, value, setValue, inputType, className="", required=false}) => {
    return ( 
        <div className={`input-container ${className}`}>
            <label>
                <h5>{title}</h5>
                {required ? 
                <input 
                    type={inputType}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                /> :
                <input 
                    type={inputType}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />}

            </label>
            
        </div>
     );
}
 
export default FormInput;