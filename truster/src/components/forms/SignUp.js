import { createContext, useContext, useState } from "react";
import UserSignUpForm from "./UserSignUpForm";
import "../../styles/signup2.css"
import "../../styles/signup.css"
import SlidableContainer from "../SlidableContainer";
import AdressSignUpForm from "./AdressSignUpForm";
import { ErrorToastContext, UserContext } from "../../App";
import { FirebaseError } from "firebase/app";

export const ErrorContext = createContext(null)

const SignUp = () => {

    const {user, isLoggedIn} = useContext(UserContext)
    const displayError = useContext(ErrorToastContext)

    const [menuSwitch, switchMenu] = useState(true)
    const [showForm, setShowForm] = useState(true)

    const [userState, setUserState] = useState({
        gender: "Others",
        firstName: "",
        lastName: "",
        birthdate: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        picture: null  
    })

    const [showErros, setShowErrors] = useState(false)

    const submitUser = (e) => {
        e.preventDefault()
        if (userState.password === userState.passwordConfirmation) {
            setShowErrors(false)
            switchMenu(!menuSwitch)
            return true
        } else {
            setShowErrors(true)
            return false
        }
    }

    const [adress, setAdress] = useState({
        number: "",
        street: "",
        additionalInfo: "",
        npa: "",
        city: "",
        country: ""
    })

    const flipMenu = (e) => {
        e.preventDefault()
        switchMenu(!menuSwitch)
    }

    const submitForm = e => {
        e.preventDefault()
        user.signUp(userState, adress)
            .then(() => setShowForm(false))
            .catch(err => {
                if (err instanceof FirebaseError) {
                    if (err.code === "auth/email-already-in-use") {
                        displayError("There is already an account with this email adress. Log in or try another email adress.")
                    }
                } else {
                    displayError(err)
                }
            })
        
    }



    return ( 
        <div className="signup">
            <h1>{showForm ? "Sign up" : "Email Verification"}</h1>
            {showForm && !isLoggedIn ? 
            <ErrorContext.Provider value={showErros}>
                <SlidableContainer 
                    leftComponent={<UserSignUpForm user={userState} setUser={setUserState} onSubmit={submitUser}/>}
                    rightComponent={<AdressSignUpForm adress={adress} setAdress={setAdress} onSubmit={submitForm} handleBack={flipMenu} />}
                    menuSwitch={menuSwitch}
                />
            </ErrorContext.Provider> :
            <div className="email-verification">
                <h4>
                    We've sent an adress containing a verification link to <span>{userState.email}</span>.
                    If you don't see the mail, make sure to check your spam.
                </h4>
            </div>
            }
        </div>
     );
}
 
export default SignUp;