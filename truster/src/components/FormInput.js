import "../styles/forminput.css"

const FormInput = ({title, value, setValue, inputType}) => {
    return ( 
        <div className="input-container">
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