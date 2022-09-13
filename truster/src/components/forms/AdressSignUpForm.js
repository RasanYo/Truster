import Input from "./Input";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import { useContext } from "react";
import { ErrorContext } from "./SignUp";


const AdressSignUpForm = ({
    adress,
    setAdress,
    onSubmit,
    handleBack
}) => {

    const showErrors = useContext(ErrorContext)

    const handleChange = e => {
        let field = e.target.name
        let newAdress = adress
        newAdress[field] = e.target.value
        setAdress(newAdress)
    }

    return ( 
        <form onSubmit={onSubmit}>
            <div className="row-container space">
                <Input
                    name="number"
                    title="Street number"
                    value={adress.number}
                    onChange={handleChange}
                    error={showErrors && adress.number.length === 0}
                    inputProps={{ required:true, type: 'number' }}
                    className="fit-width space-right"
                />
                <Input
                    name="street"
                    title="Street"
                    value={adress.street}
                    onChange={handleChange}
                    error={showErrors && adress.street.length === 0}
                    inputProps={{ required:true }}
                />
            </div>
            <Input
                name="additionalInfo"
                title="Additional information"
                value={adress.additionalInfo}
                onChange={handleChange}
            />
            <div className="row-container">
                <Input
                    name="npa"
                    title="NPA"
                    value={adress.npa}
                    onChange={handleChange}
                    error={showErrors && adress.npa.length === 0}
                    inputProps={{ required:true, type: 'number' }}
                    className="fit-width space-right"
                />
                <Input
                    name="city"
                    title="City"
                    value={adress.city}
                    onChange={handleChange}
                    error={showErrors && adress.city.length === 0}
                    inputProps={{ required:true }}
                    className="space-right"
                />
                <Input
                    name="country"
                    title="Country"
                    value={adress.country}
                    onChange={handleChange}
                    error={showErrors && adress.country.length === 0}
                    inputProps={{ required:true }}
                />
            </div>
            <div className="buttons">
                <button 
                    className="btn back"
                    onClick={handleBack}
                >
                    <AiOutlineArrowLeft
                        size={20}
                    />
                    <h6>Back</h6>
                </button>
                <button className="btn next">
                    <h6>Next</h6>
                    <AiOutlineArrowRight
                        size={20}
                    />
                </button>
            </div>
            
        </form>
     );
}
 
export default AdressSignUpForm;