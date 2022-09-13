import "../styles/profile.css"
import { useContext, useState } from "react";
import FormInput from "./forms/FormInput";
import InformationSquare from "./informationSquare";
import { UserContext } from "../App";
import { useEffect } from "react";
import {MdOutlineMailOutline} from "react-icons/md"
import {BsPatchCheckFill, BsFillTelephoneFill} from "react-icons/bs"


const Profil = () => {

    const [pageNumber, setPageNumber] = useState(0)
    const {user, isLoggedIn} = useContext(UserContext)

    const [userData,setUserData] = useState("")
    
    useEffect(()=>{
        user.getPersonalInformation().then(snapshot => {
            setUserData(snapshot.data())
        })
    },[])


    const changeStyleAndCurrentPage = (number, c,o1,o2) => {
        setPageNumber(number)
        const curr =  document.querySelector(c)
        const other1 = document.querySelector(o1)
        const other2 = document.querySelector(o2)
        curr.style.backgroundColor = '#ffcb66'
        other1.style.backgroundColor = '#e6dca5'
        other2.style.backgroundColor = '#e6dca5'
    }
    

    return ( 
        <div className="frame">
            <div className="topPart">
                <div className="profilePicture"></div>

                <div className="menu">
                    <div className="profileSection" onClick={() => changeStyleAndCurrentPage(0,'.profileSection','.visitsSection','.postsSection')}> <p>Profile</p></div>
                    <div className="visitsSection" onClick={() => changeStyleAndCurrentPage(1,'.visitsSection','.profileSection','.postsSection')}><p>Visits</p></div>
                    <div className="postsSection" onClick={() => changeStyleAndCurrentPage(2,'.postsSection','.visitsSection','.profileSection')}><p>My Posts</p></div>
                </div>
                
                <UserDetails data={userData}/>
            </div>
            
        </div>
     );
}

const UserDetails = ({
    // {gender,firstName, lastName,birthdate,email,password, passwordConfirmation,handleSubmit}
    data
}) => {
return ( 
    <div className="profileContent">
        <h2>Personnal information</h2>
        <div className="info">
                <InformationSquare 
                    title="Email"
                    value={data.email}
                />
                <InformationSquare 
                    title="Password"
                    value={data.email}
                />
                <InformationSquare 
                    title="First name"
                    value={data.firstName}
                />
                <InformationSquare 
                    title="Last name"
                    value={data.lastName}
                />
                <InformationSquare 
                    title="Date of birth"
                    value={data.dateOfBirth}
                />
                <InformationSquare 
                    title="Gender"
                    value={data.gender}
                />
        </div>
        <div className="confirmed-elements">
            {/* {data.emailConfimed && true} */}
            <div className="email-confirmed">
                <div className="logo">
                    <MdOutlineMailOutline size={20}/>
                </div>
                {4 == 4 ? "Email Confirmed" : "Email not confirmed"}
            </div>
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
 );
}
 
export default Profil;