import "../styles/profile.css"
import { useContext, useState } from "react";

import { UserContext } from "../App";
import { useEffect } from "react";
import UserDetails from "./UserDetails";
import ContactDetails from "./ContactDetails";
import PasswordSection from "./PasswordSection";
import dummy from "../res/dummy_profile_pic.png"
// import ContactDetails from "./ContactDetails";


const Profil = ({userData, setUserData}) => {

    const {user, isLoggedIn} = useContext(UserContext)

    const [userState, setUserState] = useState({
        password: "",
        passwordConfirmation: "",
    })
    
    const [pageNumber, setPageNumber] = useState(0)


    const changeStyleAndCurrentPage = (number, c,o1,o2) => {
        setPageNumber(number)
        const curr =  document.querySelector(c)
        const other1 = document.querySelector(o1)
        const other2 = document.querySelector(o2)
        curr.style.backgroundColor = '#ffcb66'
        other1.style.backgroundColor = '#e6dca5'
        other2.style.backgroundColor = '#e6dca5'
    }

    const submit = () => {
        user.updatePersonalInformation(userData).then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    const submitPassword = () => {
        user.updateCurrentPassword(userState.password).then(console.log("updated password sucessfully"))
    }
    

    return ( 
        <div className="frame">
            <div className="topPart">
                <div className="profilePicture">
                    <img src={dummy} width={"100%"} 
                          height={"100%"}  alt="" />
                    {/* {user.getProfilePictureURL(user.getUID()).then(url => console.log(url))} */}
                </div>

                <div className="menu">
                    <div className="profileSection" onClick={() => changeStyleAndCurrentPage(0,'.profileSection','.visitsSection','.postsSection')}> <p>Profile</p></div>
                    <div className="visitsSection" onClick={() => changeStyleAndCurrentPage(1,'.visitsSection','.profileSection','.postsSection')}><p>Contact Details</p></div>
                    <div className="postsSection" onClick={() => changeStyleAndCurrentPage(2,'.postsSection','.visitsSection','.profileSection')}><p>Password</p></div>
                </div>
                {/* {console.log(userData)} */}
                {userData && pageNumber==0 && <UserDetails data={userData} user={user} setData={setUserData} onSubmit={submit}/>}
                {userData && pageNumber==1 && <ContactDetails data={userData} user={user} setData={setUserData} onSubmit={submit}/>}
                {userData && pageNumber==2 && <PasswordSection user={userState} setUser={setUserState} onSubmit={submitPassword}/>}

                {/* {userData && pageNumber==1 && <ContactDetails data={userData} user={user} setData={setUserData} onSubmit={submit}/>} */}
            </div>
            
        </div>
     );
}
 
export default Profil;