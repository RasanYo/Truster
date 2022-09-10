import "../styles/forminput.css"

const FormInput = ({title, value, setValue, inputType, className=""}) => {
    return ( 
        <div className={`input-container ${className}`}>
            <h5>{title}</h5>
            <input 
                type={inputType}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </div>
     );
}
 
export default FormInput;