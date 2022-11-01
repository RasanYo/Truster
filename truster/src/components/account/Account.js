import MenuItem from "../page_with_menu/MenuItem";
import PageWithMenuContainer from "../page_with_menu/PageWithMenuContainer";
import "../../styles/account.css"
import Profil from "../profile/Profil.js"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import PostList from "../displayPosts/PostList";

const Account = ({startPage}) => {
    const {user} = useContext(UserContext)
    const [userData,setUserData] = useState("")
    
    useEffect(()=>{
        user.getPersonalInformation().then(snapshot => {
            setUserData(snapshot.data())
        })
    }, [])

    return (
         
        <div className="account">
            <PageWithMenuContainer startPage={startPage}>
                <MenuItem link="Profile" element={<Profil userData={userData} setUserData={setUserData}/>}/>
                {/* <MenuItem link="My Posts" element={<PostList />}/> */}
                <MenuItem link="My Posts" element={<PostList posts={userData.myPosts} />} />
                <MenuItem link="My Visits" element={<div>My Visits</div>} />
                <MenuItem link="Messages" element={<div>Messages</div>} />
            </PageWithMenuContainer>
        </div>
     );
}
 
export default Account;