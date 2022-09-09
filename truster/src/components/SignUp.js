import { useState } from "react";
import "../styles/signup.css"
import FormInput from "./FormInput";
import { AiOutlineArrowRight } from "react-icons/ai"


const SignUp = () => {

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [birthdate, setBirthdate] = useState(null) 
    const [email, setEmail] = useState(null)    
    const [password, setPassword] = useState(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState(null)
    const [gender, setGender] = useState(null)


    const steps = ["step 1", "step 2", "step 3", "step 4"]

    return ( 
        <div className="signup">
            <h1>Sign up</h1>
            <form>
                <label>Gender:</label>
                <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Others</option> 
                </select>
                <input
                    type="file"
                    placeholder="Photo"
                />
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