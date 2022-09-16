import Input from "./forms/Input"
import {MdOutlineMailOutline, MdOutlineModeEditOutline} from "react-icons/md"
import {BsPatchCheckFill, BsFillTelephoneFill} from "react-icons/bs"
import "../styles/userdetails.css" 

const UserDetails = (
    // {gender,firstName, lastName,birthdate,email,password, passwordConfirmation,handleSubmit}
    {data, user, setData, onSubmit}
    ) => {

    const handleChange = e => {
        let field = e.target.name
        let newData = data
        newData[field] = e.target.value
        setData(newData)
        console.log(data)
    }

    const handleAdressChange = e =>{
        let field = e.target.name
        let newAdress = data.adress
        newAdress[field] = e.target.value
        data.adress = newAdress
        console.log(data)
    }
        
return ( 
    <div className="profileContent">
        
        
        <form>
            
            <div className="personal-information">
                <h2>Personnal information</h2>
                <div className="info">
                    <div className="row-container">
                        <Input 
                            name="firstName"
                            title="First name"
                            value={data.firstName}
                            className="max-width space-right"
                            error={data.firstName.length === 0}
                            onChange={handleChange}
                        />
                        <Input 
                            name="lastName"
                            title="Last name"
                            value={data.lastName}
                            className="max-width"
                            error={data.lastName.length === 0}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className="row-container">
                        <Input 
                            name="dob"
                            title="Date of birth"
                            value={data.dob}
                            inputProps={{ required:true, type:"date" }}
                            onChange={handleChange}
                            className="space-right"
                        />
                    </div>
                    
                    <div className="row-container gender">
                        <label className="gender-title">Gender:</label>
                        <div className="gender-form">
                            <div>Male</div> 
                            <div>Female</div> 
                            <div>Others</div> 
                        </div>
                        
                    </div>
{/*                         
                    
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
                            {user.user.emailVerified ? "Email Confirmed" : "Email not confirmed"}
                        </div>
                    </div> */}
                    
                    
                </div>
                    <div className="confirmed-elements">
                        {/* {data.emailConfimed && true} */}
                        <div className="identity-confirmed">
                            <div className="logo">
                                <BsPatchCheckFill size={20}/>
                            </div>
                            
                            {4 == 4 ? "Verify your identity" : "Verified"}
                        </div>
                        <div className="phone-confirmed">
                            <div className="logo">
                                <BsFillTelephoneFill size={20}/>
                            </div>
                        
                            {4 == 4 ? "Add your phone number" : "Phone number : ..."}
                        </div>

                    </div>
            
                 </div>

                 <div className="about-me">
                    <h5>About Me</h5>
                    <textarea name="aboutMe" onChange={handleChange}>{data.aboutMe}</textarea>
                 </div>
        
            
            


        <div className="address-section">
            <h2>Address</h2>
            <div className="row-container">
                    <Input 
                            name="street"
                            title="Street"
                            value={data.adress.street}
                            onChange={handleAdressChange}
                            error={data.adress.street.length === 0}
                            className="space-right max-width"
                            // logo=MdOutlineModeEditOutline
                    />

                    <Input 
                            name="number"
                            title="Street Number"
                            value={data.adress.number}
                            error={data.adress.number.length === 0}
                            onChange={handleAdressChange}
                            inputProps={{type: 'number' }}
                            className="fit-width"
                            // logo=MdOutlineModeEditOutline
                    />      
            </div>
            <div className="row-container">
                    <Input 
                            name="npa"
                            title="Postal Code"
                            value={data.adress.npa}
                            onChange={handleAdressChange}
                            error={data.adress.npa.length === 0}
                            inputProps={{type: 'number' }}
                            className="space-right fit-width"
                            // logo=MdOutlineModeEditOutline
                    />

                    <Input 
                            name="city"
                            title="City"
                            value={data.adress.city}
                            onChange={handleAdressChange}
                            error={data.adress.city.length === 0}
                            className="fit-width space-right"
                            // logo=MdOutlineModeEditOutline
                    />      
                    <Input 
                            name="country"
                            title="Country"
                            value={data.adress.country}
                            onChange={handleAdressChange}
                            error={data.adress.country.length === 0}
                            className="fit-width"
                            // logo=MdOutlineModeEditOutline
                    />   
            </div>
            
        </div>
        <div className="save-delete-div">
            <div >
                <button type="button" onClick={onSubmit} className="save-button">
                    <h6>SAVE CHANGES</h6>
                </button>
            </div>
            <div>
                <button type="button" className="delete-button">
                    <h6>DELETE ACCOUNT</h6>
                </button>
            </div>
        </div>
        

        </form>
        
    </div>
 );
}
export default UserDetails;