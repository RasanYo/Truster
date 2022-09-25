import Input from "../forms/Input"
import "../../styles/passwordSection.css" 
import 'intl-tel-input/build/css/intlTelInput.css';
import 'react-phone-number-input/style.css'
import PhoneInput,{isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'
import { useContext, useState } from "react";
import LogIn from "../forms/LogIn";
import { EmailAuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential } from "firebase/auth";
import { ErrorToastContext, UserContext } from "../../App";
import { useEffect } from "react";


const PasswordSection = (
    // {gender,firstName, lastName,birthdate,email,password, passwordConfirmation,handleSubmit}
    {userState, setUserState, onSubmit, user}
    ) => {

    const displayError = useContext(ErrorToastContext)
    const displaySuccess = useContext(ErrorToastContext)
    const [error,setError] = useState(false)
    const [popUp,setPopUp] = useState(false)
    const [emailGiven,setEmailGiven] = useState("")
    const [passwordGiven,setPasswordGiven] = useState("")

    useEffect(() => {
        setUserState({
            password: "",
            passwordConfirmation: "",
        })
    }, [])

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,32})$/
    function validate(password){
        return pattern.test(password);
    }
        
    const handleChange = e => {
        let field = e.target.name //firstname
        let newUser = userState
        newUser[field] = e.target.value
        setUserState(newUser)
        setError(!validate(userState.password) && userState.password !== userState.passwordConfirmation)
    }

    const submitWithCondition = () => {
        user.updateCurrentPasswordWithCredentials(emailGiven,passwordGiven,userState.password).then(() => {
            displaySuccess("success","Password changed !")
            setPopUp(false)
        }).catch((error) => {
            console.log("Ya une erreur frerot")
            console.log(error)
            displayError("error","Check your entries")
          });
    }

return ( 
    <div>
        {!popUp && <form id="personal-information">
            <div >
                <div className="info">
                    <div className="row-container">
                    <Input
                        name="password"
                        title="New password"
                        value={userState.password}
                        onChange={handleChange}
                        error={!validate(userState.password)}
                        inputProps={{ required:true, type:"password" }}
                    />
                    <Input
                        name="passwordConfirmation"
                        title="Confirm new password"
                        value={userState.passwordConfirmation}
                        onChange={handleChange}
                        error={userState.password !== userState.passwordConfirmation}
                        inputProps={{ required:true, type:"password" }}
                    />
                    </div>
                    
                </div>
                 </div>
        
        
        
        <div className="save-delete-div">
            <div >
                <button type="button" onClick={()=>{if(!error) {setPopUp(true)
                console.log(user)}}} className="save-button">
                    <h6>SAVE CHANGES</h6>
                </button>
            </div>
        </div>
        

        </form>}
        {popUp && <div className="log-in-page-for-changing-password">
            <div className="space-top">
                    <h3 >Authenticate yourself to change your password</h3>
                    <Input
                        name="email"
                        title="email"
                        value={emailGiven}
                        onChange={(e)=>setEmailGiven(e.target.value)
                        }
                        inputProps={{ required:true, type:"email" }}
                    />

                    <Input
                        name="password"
                        title="password"
                        value={passwordGiven}
                        onChange={(e) => setPasswordGiven(e.target.value)}
                        inputProps={{ required:true, type:"password" }}
                    />

                <div className="row-container ">
                    <button type="button" onClick={submitWithCondition} className="ok-button space-right">
                        <h6>OK</h6>
                    </button>
                    <button type="button" onClick={()=>setPopUp(false)} className="cancel-button">
                        <h6>CANCEL</h6>
                    </button>
                </div>
                
            </div>
        </div>}
        
        
    </div>
 );
}
export default PasswordSection;