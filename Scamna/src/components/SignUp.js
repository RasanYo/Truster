import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DBClientContext } from "../App";
import { Link } from "react-router-dom";

const SignUp = () => {

    const client = useContext(DBClientContext)

    const [gender, setGender] = useState("Others")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("01/01/2000")
    const [streetNumber, setStreetNumber] = useState("")
    const [streetName, setStreetName] = useState("")
    const [npa, setNpa] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== passwordConfirmation) {
            console.log("Passwords do not match")
            return false
        }
        client.createUser({
            gender: gender,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            adress: `${streetNumber}, ${streetName}\n${npa} ${city}\n${country}`,
            phoneNumber: phoneNumber
        }, password)
        return true
    }

    return ( 
        <div className="signup">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="First name"
                type="text" 
                required 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />

                <input 
                placeholder="Last name"
                type="text" 
                required 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />

                <input 
                placeholder="Email"
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                placeholder="New password"
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <input 
                placeholder="Confirm password"
                type="password" 
                required 
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />

                <label>Gender</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Others">Others</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                </select>


                <label>Date of birth</label>
                <input 
                type="date" 
                required 
                onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <input 
                placeholder="Street Number"
                type="number" 
                required 
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                />

                <input 
                placeholder="Street Name"
                type="text" 
                required 
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                />

                <input 
                placeholder="NPA"
                type="number"  
                required 
                value={npa}
                onChange={(e) => setNpa(e.target.value)}
                />

                <input 
                placeholder="City"
                type="text" 
                required 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />

                <input 
                placeholder="Country"
                type="text" 
                required 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                />

                <input 
                placeholder="Phone number (optional)"
                type="text"  
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                />


                <button>Sign up</button>
            </form>
        </div>
     );
}
 
export default SignUp;