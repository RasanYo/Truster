import MenuItem from "../page_with_menu/MenuItem";
import PageWithMenuContainer from "../page_with_menu/PageWithMenuContainer";
import "../../styles/account.css"
import Profil from "../Profil.js"

const Account = () => {
    return ( 
        <div className="account">
            <PageWithMenuContainer>
                <MenuItem link="Profile" element={<Profil />}/>
                <MenuItem link="My Posts" element={<div>My Posts</div>}/>
                <MenuItem link="My Visits" element={<div>My Visits</div>}/>
                <MenuItem link="Messages" element={<div>Messages</div>}/>
            </PageWithMenuContainer>
        </div>
        
     );
}
 
export default Account;