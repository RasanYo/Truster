import { createContext, useContext, useState } from "react";
import UserSignUpForm from "./UserSignUpForm";
import "../../styles/signup3.css"
import SlidableContainer from "../SlidableContainer";
import AdressSignUpForm from "./AdressSignUpForm";
import { ErrorToastContext, UserContext } from "../../App";
import { FirebaseError } from "firebase/app";

export const ErrorContext = createContext(null)

const SignUp = () => {

    const {user, isLoggedIn} = useContext(UserContext)
    const displayError = useContext(ErrorToastContext)
    const displaySuccess = useContext(ErrorToastContext)

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
        aboutMe: "",
        picture: null,
    })

    const [showErrors, setShowErrors] = useState(false)

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
            .then(() => {
                setShowForm(false)
                displaySuccess("success","Account created")
            })
            .catch(err => {
                if (err instanceof FirebaseError) {
                    if (err.code === "auth/email-already-in-use") {
                        displayError("error", "There is already an account with this email adress. Log in or try another email adress.")
                    }
                } else {
                    console.log(err)
                }
            })
        
    }



    return ( 
        <div className="signup">
            <h1>{showForm ? "Sign up" : "Email Verification"}</h1>
            {showForm && !isLoggedIn ? 
            <ErrorContext.Provider value={showErrors}>
                <SlidableContainer 
                    leftComponent={<UserSignUpForm user={userState} setUser={setUserState} onSubmit={submitUser}/>}
                    rightComponent={<AdressSignUpForm adress={adress} setAdress={setAdress} onSubmit={submitForm} handleBack={flipMenu} />}
                    menuSwitch={menuSwitch}
                />
            </ErrorContext.Provider> :
            <div className="email-verification">
                <h4>
                    We've sent an email containing a verification link to <span>{userState.email}</span>.
                    If you don't see the mail, make sure to check your spam.
                </h4>
            </div>
            }
        </div>
     );
}
 
export default SignUp;