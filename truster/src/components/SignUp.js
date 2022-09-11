import { useContext, useState } from "react";
import "../styles/signup.css"
import FormInput from "./FormInput";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import PictureContainer from "./PictureContainer";

const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,32})$/
function validate(password){
    return pattern.test(password) ? 1 : 0;
}

const SignUp = () => {

    
    const navigate = useNavigate()
    const {user, isLoggedIn} = useContext(UserContext)

    // FIRST FORM #################################
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthdate, setBirthdate] = useState("") 
    const [email, setEmail] = useState("")    
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [gender, setGender] = useState("Others")

    


    const [flipped, flipForm] = useState(false)
    const handleFlip = e => {
        e.preventDefault()
        flipForm(!flipped)
    }

    const handleUserForm = e => {
        e.preventDefault()
        if (
            validate(password) &&
            password === passwordConfirmation 
        ) {
            flipForm(!flipped)
            return true
        } else {
            return false
        }
    }

    // FIRST FORM #################################

    // SECOND FORM #################################
    const [streetNumber, setStreetNumber] = useState("")
    const [street, setStreet] = useState("")
    const [additionalInfo, setAdditionalInfo] = useState("")
    const [npa, setNPA] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")


    const handleAdressForm = e => {
        e.preventDefault()
        user.signUp(
            email, 
            password, 
            country,
            city,
            {
                dob: birthdate,
                email: email,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                adress: `${additionalInfo},\n${streetNumber}, ${street}\n${npa} ${city}, ${country}`
            }
        )
        .then(() => {navigate("/")})
        .catch(err => {
            if (err instanceof FirebaseError) {
                if (err.code === "auth/email-already-in-use") {
                    console.log("There is already an account with this email adress. Log in or try another email adress.")
                }
            }
        })
    }

    // SECOND FORM #################################

    return ( 
        <div className="signup">
            <h1>Sign up</h1>
            {!flipped ? 
            <UserDetailsForm
                gender={gender} setGender={setGender}
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                birthdate={birthdate} setBirthdate={setBirthdate}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation}
                handleSubmit={handleUserForm}
            /> :
            <AdressForm
                streetNumber={streetNumber} setStreetNumber={setStreetNumber}
                street={street} setStreet={setStreet}
                additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo}
                npa={npa} setNPA={setNPA}
                city={city} setCity={setCity}
                country={country} setCountry={setCountry}
                handleSubmit={handleAdressForm}
                handleFlip={handleFlip}
            />}
        </div>
     );
}
 
export default SignUp;

const UserDetailsForm = ({
        gender, setGender, 
        firstName, setFirstName, 
        lastName, setLastName,
        birthdate, setBirthdate,
        email, setEmail,
        password, setPassword,
        passwordConfirmation, setPasswordConfirmation,
        handleSubmit
        
    }) => {
    return ( 
        <form onSubmit={handleSubmit}>
            <label>Gender:</label>
            <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                required
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
                required={true}
            />
            <FormInput 
                title="Last name"
                value={lastName}
                setValue={setLastName}
                inputType="text"
                required={true}
            />
            <FormInput 
                title="Date of birth"
                value={birthdate}
                setValue={setBirthdate}
                inputType="date"
                required={true}
            />
            <FormInput 
                title="Email adress"
                value={email}
                setValue={setEmail}
                inputType="email"
                className="email"
                required={true}
            />
            <div className="password-container">
                <FormInput 
                    title="Password"
                    value={password}
                    setValue={setPassword}
                    inputType="password"
                    required={true}
                    validity={() => {return validate(password)}}
                    errorMessage="A correct password has [8-32] characters, at least 1 number sign and at lest 1 uppercase letter"
                />
                <FormInput 
                    title="Confirm password"
                    value={passwordConfirmation}
                    setValue={setPasswordConfirmation}
                    inputType="password"
                    required={true}
                    validity={() => {return password === passwordConfirmation}}
                    errorMessage="Passwords don't correspond"
                />
                <PictureContainer />
            </div>
            <div className="buttons">
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

const AdressForm = ({
    streetNumber, setStreetNumber,
    street, setStreet,
    additionalInfo, setAdditionalInfo,
    npa, setNPA,
    city, setCity,
    country, setCountry,
    handleSubmit,
    handleFlip=null
}) => {
    return ( 
        <form onSubmit={handleSubmit}>
            <div className="container">
                <FormInput 
                    className="number"
                    title="Street number"
                    value={streetNumber}
                    setValue={setStreetNumber}
                    inputType="number"
                    required={true}
                />
                <FormInput 
                    className="street"
                    title="Street"
                    value={street}
                    setValue={setStreet}
                    inputType="text"
                    required={true}
                />
            </div>
            <FormInput 
                className="additional-info"
                title="Additional information"
                value={additionalInfo}
                setValue={setAdditionalInfo}
                inputType="text"
            />
            <div className="container">
                <FormInput 
                    title="NPA"
                    value={npa}
                    setValue={setNPA}
                    inputType="number"
                    required={true}
                />
                <FormInput 
                    title="City"
                    value={city}
                    setValue={setCity}
                    inputType="text"
                    required={true}
                />
                <FormInput 
                    title="Country"
                    value={country}
                    setValue={setCountry}
                    inputType="text"
                    required={true}
                />
            </div>
            <div className="buttons">
                <button 
                    className="btn-back"
                    onClick={handleFlip}
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

 