import MenuItem from "../page_with_menu/MenuItem";
import PageWithMenuContainer from "../page_with_menu/PageWithMenuContainer";
import "../../styles/account.css"
import Profil from "../Profil.js"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
// import PostList from "../PostList";

const Account = () => {
    const {user, isLoggedIn} = useContext(UserContext)
    const [userData,setUserData] = useState("")
    
    useEffect(()=>{
        console.log("entering useEffect")
        console.log(user)
        user.getPersonalInformation().then(snapshot => {
            setUserData(snapshot.data())
            console.log(snapshot.data())
        })
        console.log("exiting useEffect")
    }, [])

    return (
         
        <div className="account">
            <PageWithMenuContainer>
                <MenuItem link="Profile" element={<Profil userData={userData} setUserData={setUserData}/>}/>
                {/* <MenuItem link="My Posts" element={<PostList />}/> */}
                <MenuItem link="My Visits" element={<div>My Visits</div>}/>
                <MenuItem link="Messages" element={<div>Messages</div>}/>
            </PageWithMenuContainer>
        </div>
     );
}
 
export default Account;