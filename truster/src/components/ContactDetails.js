import Input from "./forms/Input"
import {MdOutlineMailOutline, MdOutlineModeEditOutline} from "react-icons/md"
import {BsPatchCheckFill, BsFillTelephoneFill} from "react-icons/bs"
import "../styles/contactDetails.css" 
import 'intl-tel-input/build/css/intlTelInput.css';
import 'react-phone-number-input/style.css'
import PhoneInput,{isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'
import { useContext, useState } from "react";
import { UserContext } from "../App";


const ContactDetails = (
    // {gender,firstName, lastName,birthdate,email,password, passwordConfirmation,handleSubmit}
    {data, userObject, setData, onSubmit,displayError}
    ) => {

    const {user, isLoggedIn, emailVerified} = useContext(UserContext)

    const [value, setValue] = useState(data.phone)
    const [error, setError] = useState()
        

    const handleChange = e => {
        console.log(e.target.name)
        let field = e.target.name
        let newData = data
        newData[field] = e.target.value
        setData(newData)
        console.log(data)
    }

    // const changePhone = e =>{
    //     console.log(e)

    //     if(!isValidPhoneNumber(e) && !error) {setError(true)}
    //     if(isValidPhoneNumber(e) && error) {setError(false)}
    //     console.log(error)
    //     setValue(e)
    //     let newData = data
    //     newData["phone"] = e
    //     setData(newData)
    //     console.log(data)
    // }

    const submitChanges = () => {
        if(!isValidPhoneNumber(value)){
            displayError("error","Please provide a valid number")
        }
        else {
            let newData = data
            newData["phone"] = value
            console.log(data.email !== user.user.email)
            if (data.email !== user.user.email) {
                user.changeEmail(data.email)
            }
            setData(newData)
            onSubmit()
        }
    }
        
return ( 
    <div>
        <form>
            <div className="personal-information">
                <div className="info">
                    <div className="row-container">
                        <Input 
                            name="email"
                            title="Email"
                            onChange={handleChange}
                            error={data.email.length === 0}
                            inputProps={{type:"email" }}
                            value={data.email}
                            className="space-right max-width"
                            // logo=MdOutlineModeEditOutline
                        />
                        <div className="email-confirmed max-width">
                            <div className="logo space-right">
                                <MdOutlineMailOutline size={20}/>
                            </div>
                            {emailVerified ? "Email Confirmed" : "Email not confirmed"}
                        </div>
                    </div>
                    
                    
                </div>
                        <div id="phone">
                            <PhoneInput
                                // type="number"
                                countrySelectProps={{ unicodeFlags: true }}
                                international={true}
                                placeholder="Enter phone number"
                                value={value}
                                onChange={setValue}/>
                        </div>
                        <div className="error">
                            {error&&"Invalid phone input"}
                        </div>
            
                 </div>
        
        <div className="save-delete-div">
            <div >
                <button type="button" onClick={submitChanges} className="save-button">
                    <h6>SAVE CHANGES</h6>
                </button>
            </div>
        </div>
        

        </form>
        
    </div>
 );
}
export default ContactDetails;