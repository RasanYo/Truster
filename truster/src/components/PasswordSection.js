import Input from "./forms/Input"
import "../styles/passwordSection.css" 
import 'intl-tel-input/build/css/intlTelInput.css';
import 'react-phone-number-input/style.css'
import PhoneInput,{isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'
import { useState } from "react";
import LogIn from "./forms/LogIn";


const PasswordSection = (
    // {gender,firstName, lastName,birthdate,email,password, passwordConfirmation,handleSubmit}
    {user, setUser, onSubmit}
    ) => {


    const [error,setError] = useState(false)
    const [popUp,setPopUp] = useState(false)


    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,32})$/
    function validate(password){
        return pattern.test(password);
    }
        
    const handleChange = e => {
        let field = e.target.name //firstname
        let newUser = user
        newUser[field] = e.target.value
        setUser(newUser)
        setError(!validate(user.password) && user.password !== user.passwordConfirmation)
    }

    const submitWithCondition = () => {
        if(!error) {
            setPopUp(true)
            const mainPage = document.getElementById("personal-information")
            mainPage.style.display = "none"
        }
    }

return ( 
    <div>
        <form id="personal-information">
            <div >
                <div className="info">
                    <div className="row-container">
                    <Input
                        name="password"
                        title="Password"
                        value={user.password}
                        onChange={handleChange}
                        error={!validate(user.password)}
                        inputProps={{ required:true, type:"password" }}
                    />
                    <Input
                        name="passwordConfirmation"
                        title="Confirm password"
                        value={user.passwordConfirmation}
                        onChange={handleChange}
                        error={user.password !== user.passwordConfirmation}
                        inputProps={{ required:true, type:"password" }}
                    />
                    </div>
                    
                </div>
                 </div>
        
        
        
        <div className="save-delete-div">
            <div >
                <button type="button" onClick={submitWithCondition} className="save-button">
                    <h6>SAVE CHANGES</h6>
                </button>
            </div>
        </div>
        

        </form>
        {popUp && <div className="log-in-page-for-changing-password">
            <div>
                    <h2>You need to log in order to change your password</h2>
                    <LogIn></LogIn>
            </div>
        </div>}
        
        
    </div>
 );
}
export default PasswordSection;