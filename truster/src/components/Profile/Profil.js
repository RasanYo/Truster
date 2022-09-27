import "../../styles/profile.css"
import { useContext, useState } from "react";

import { ErrorToastContext, UserContext } from "../../App";
import { useEffect } from "react";
import ContactDetails from "./ContactDetails";
import PasswordSection from "./PasswordSection";
import UserDetails from "./UserDetails";


const Profil = ({userData, setUserData}) => {

    const {user, isLoggedIn} = useContext(UserContext)
    const displayError = useContext(ErrorToastContext)
    const displaySuccess = useContext(ErrorToastContext)

    const [userState, setUserState] = useState({
        password: "",
        passwordConfirmation: "",
    })

    useEffect(() => {
        if(userData.imgUrl) {
            setProfilePicture(userData.imgUrl)
        }

    },[userData.imgUrl])

    const [profile_picture,setProfilePicture] = useState()
    
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
            displaySuccess("success","Personal information updated !")
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            displayError("error","There is an error updating your profile")
        });
    }

    const submitPassword = () => {
        user.updateCurrentPassword(userState.password).then(console.log("updated password sucessfully"))
    }

    const changePhoto = (event) => {
        console.log("Changing image")
        let file = event.target.files[0]
        console.log("image size is " + file.size)

        if(file.size > 7000000){
            console.log("File size too big")
            displayError("error","The file size is too big. The maximum size is 7MB")
        }else {
            setProfilePicture(URL.createObjectURL(file));
            console.log(profile_picture)
            user.uploadProfilePicture(event.target.files[0], user.getUID())
            .then(() => {
                user.getProfilePictureURL(user.getUID()).then(url => {
                    console.log("Changing url in database of user")
                    let newUserData = userData
                    newUserData["imgUrl"] = url
                    setUserData(newUserData)
                    submit()
                    displaySuccess("success","Profile picture updated !")
                })
            })
            
        }
        
    }
    

    return ( 
        <div className="frame">
            <div className="topPart">
                <div className="profilePicture">
                    {/* {profile_picture && <UploadAndDisplayImage selectedImage={profile_picture} setSelectedImage={setProfilePicture} />} */}
                    {profile_picture && <img src={profile_picture} width={"100%"} 
                          height={"100%"}  alt="" />}
                    <input
                            className="inputfile"
                            type="file"
                            name="file"
                            id="file"
                            value={''}
                            onChange={changePhoto}
                            accept=".jpg, .jpeg, .png"
                        />
                    <label htmlFor="file">Change Image</label>
                    
                    
                    
                </div>

                <div className="menu">
                    <div className="profileSection" onClick={() => changeStyleAndCurrentPage(0,'.profileSection','.visitsSection','.postsSection')}> <p>Profile</p></div>
                    <div className="visitsSection" onClick={() => changeStyleAndCurrentPage(1,'.visitsSection','.profileSection','.postsSection')}><p>Contact Details</p></div>
                    <div className="postsSection" onClick={() => changeStyleAndCurrentPage(2,'.postsSection','.visitsSection','.profileSection')}><p>Password</p></div>
                </div>
                {/* {console.log(userData)} */}
                {userData && pageNumber==0 && <UserDetails data={userData} user={user} setData={setUserData} onSubmit={submit} displayError={displayError} displaySuccess={displaySuccess}/>}
                {userData && pageNumber==1 && <ContactDetails data={userData} user={user} setData={setUserData} onSubmit={submit} displayError={displayError}/>}
                {userData && pageNumber==2 && <PasswordSection userState={userState} setUserState={setUserState} onSubmit={submitPassword} user={user}/>}

                {/* {userData && pageNumber==1 && <ContactDetails data={userData} user={user} setData={setUserData} onSubmit={submit}/>} */}
            </div>
            
        </div>
     );
}
 
export default Profil;