import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DBClientContext, UserContext } from "../App";

const Navbar = () => {

    const client = useContext(DBClientContext)
    const {currentUser, setCurrentUser, isLoggedIn} = useContext(UserContext)
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = e => {
        setCurrentUser(currentUser.logout())
    }

    // client.auth.onAuthStateChanged(user => {
    //     if (user) {
    //         setIsLoggedIn(true)
    //     } else {
    //         setIsLoggedIn(false)
    //     }
    // })


    

    return ( 
        <nav className="navbar">
            <Link to="/"><h1>Scamna</h1></Link>
            <div className="links">
                {!isLoggedIn && <Link to="/signup">Sign up</Link>}
                {!isLoggedIn && <Link to="/login">Log in</Link>}
                {isLoggedIn && <Link to ="/profile">Profile</Link>}
                {isLoggedIn && <Link to="/" onClick={handleLogout}>Sign out</Link>}
            </div>
        </nav>
     );
}
 
export default Navbar;