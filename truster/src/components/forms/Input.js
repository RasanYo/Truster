import "../../styles/input.css"
const Input = ({
    name,
    title,
    value,
    onChange,
    errorMessage=`*Invalid ${title.toLowerCase()}`,
    error=false,
    inputProps={},
    className="",
    logo=null
}) => {


    return (
        <div className={`input ${className}`}>
            <span className="logo">{logo}</span>
            <div className="column-container">
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
        </div>
    );
}
 
export default Input;