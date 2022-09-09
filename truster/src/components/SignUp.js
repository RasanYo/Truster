import { useContext, useState } from "react";
import "../styles/signup.css"
import FormInput from "./FormInput";
import { AiOutlineArrowRight } from "react-icons/ai"
import { UserContext } from "../App";


const SignUp = () => {

    const {user, isLoggedIn} = useContext(UserContext)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthdate, setBirthdate] = useState("") 
    const [email, setEmail] = useState("")    
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [gender, setGender] = useState("Others")
    const [adress, setAdress] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")


    const steps = ["step 1", "step 2", "step 3", "step 4"]

    const handleSubmit = e => {
        e.preventDefault()
        if (password === passwordConfirmation) {
            user.signUp(
                email, 
                password, 
                {
                    dob: birthdate,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    adress: adress
                }
            ).then(() => {return true})
        }
        else {
            return false
        }
        
    }

    return ( 
        <div className="signup">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>Gender:</label>
                <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Others</option> 
                </select>
                <FormInput 
                    title="First name"
                    value={firstName}
                    setValue={setFirstName}
                    inputType="text"
                />
                <FormInput 
                    title="Last name"
                    value={lastName}
                    setValue={setLastName}
                    inputType="text"
                />
                <FormInput 
                    title="Date of birth"
                    value={birthdate}
                    setValue={setBirthdate}
                    inputType="date"
                />
                <FormInput 
                    title="Email adress"
                    value={email}
                    setValue={setEmail}
                    inputType="email"
                />
                <div className="password-container">
                    <FormInput 
                        title="Password"
                        value={password}
                        setValue={setPassword}
                        inputType="password"
                    />
                    <FormInput 
                        title="Confirm password"
                        value={passwordConfirmation}
                        setValue={setPasswordConfirmation}
                        inputType="password"
                    />
                </div>
                <button>
                    <h6>Next</h6>
                    <AiOutlineArrowRight
                        size={20}
                    />
                </button>
            </form>
        </div>
     );
}
 
export default SignUp;