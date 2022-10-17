import { createContext, useContext, useState } from "react";
import UserSignUpForm from "./UserSignUpForm";
import "../../styles/signup3.css"
import { ErrorToastContext, UserContext } from "../../App";
import { FirebaseError } from "firebase/app";

export const ErrorContext = createContext(null)

const SignUp = () => {

    const {user} = useContext(UserContext)
    const displayToast = useContext(ErrorToastContext)

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
            user.signup(userState)
                .then(() => {
                    displayToast("success","Account created")
                })
                .catch(err => {
                    if (err instanceof FirebaseError) {
                        if (err.code === "auth/email-already-in-use") {
                            displayToast("error", "There is already an account with this email adress. Log in or try another email adress.")
                        }
                    } else {
                        console.log(err)
                    }
            })
        } else {
            setShowErrors(true)
            return false
        }
    }



    return ( 
        <div className="signup">
            <h1>Sign Up</h1>
            <ErrorContext.Provider value={showErrors}>
                <UserSignUpForm user={userState} setUser={setUserState} onSubmit={submitUser}/>
            </ErrorContext.Provider>
        </div>
     );
}
 
export default SignUp;