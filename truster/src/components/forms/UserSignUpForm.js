import { useContext, useEffect } from "react"
import Input from "./Input"
import UploadAndDisplayImage from "./UploadAndDisplayImage"
import { AiOutlineArrowRight } from "react-icons/ai"
import { ErrorContext } from "./SignUp"


const UserSignUpForm = ({
    user,
    setUser,
    onSubmit
}) => {

    const showErrors = useContext(ErrorContext)

    const setImage = (image) => {
        let newUser = user
        newUser.picture = image
        setUser(newUser)
    }

    const handleChange = e => {
        let field = e.target.name //firstname
        let newUser = user
        newUser[field] = e.target.value
        setUser(newUser)
    }

    useEffect(() => {
        console.log("USER", user)
    }, [])

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{8,32})$/
    function validate(password){
        return pattern.test(password);
    }

    return (  
        <form onSubmit={onSubmit}>
            <label>Gender:</label>
            <select
                name="gender"
                // value={user.gender}
                onChange={handleChange}
                required
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Others</option> 
            </select>
            
            <Input
                name="firstName"
                title="First name"
                value={user.firstName}
                onChange={handleChange}
                error={showErrors && user.firstName.length === 0}
                inputProps={{ required:true }}
                className="half-width"
            />
            <Input
                name="lastName"
                title="Last name"
                value={user.lastName}
                onChange={handleChange}
                error={showErrors && user.lastName.length === 0}
                inputProps={{ required:true }}
                className="half-width"
            />
            <Input
                name="birthdate"
                title="Date of birth"
                value={user.birthdate}
                onChange={handleChange}
                error={showErrors && user.birthdate.length === 0}
                inputProps={{ required:true, type:"date" }}
                className="fit-width"
            />
            <UploadAndDisplayImage
                selectedImage={user.picture}
                setSelectedImage={setImage}
            />
            <Input
                name="email"
                title="Email adress"
                value={user.email}
                onChange={handleChange}
                error={showErrors && user.email.length === 0}
                inputProps={{ required:true, type:"email" }}
            />
            <Input
                name="password"
                title="Password"
                value={user.password}
                onChange={handleChange}
                error={showErrors && !validate(user.password)}
                inputProps={{ required:true, type:"password" }}
            />
            <Input
                name="passwordConfirmation"
                title="Confirm password"
                value={user.passwordConfirmation}
                onChange={handleChange}
                error={showErrors && user.password !== user.passwordConfirmation}
                inputProps={{ required:true, type:"password" }}
            />
            
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
 
export default UserSignUpForm;