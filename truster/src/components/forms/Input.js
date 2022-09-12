import "../../styles/input.css"
const Input = ({
    name,
    title,
    value,
    onChange,
    errorMessage=`*Invalid ${title.toLowerCase()}`,
    error=false,
    inputProps={},
    className=""
}) => {


    return (
        <div className={`input ${className}`}>
            <div className="container">
                <h5>{title}</h5>
                <input 
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...inputProps}
                />
            </div>
            <h6 className="err-msg" style={{
                opacity: error ? '1' : '0'
            }}>{errorMessage}</h6>
        </div>
    );
}
 
export default Input;