import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DBClientContext } from "../App";

const Navbar = () => {

    const client = useContext(DBClientContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = e => {
        client.logOutCurrentUser()
    }

    client.auth.onAuthStateChanged(user => {
        client.currentUser = user
        if (user) {
            console.log("Logged in")
            setIsLoggedIn(true)
        } else {
            console.log("Logged out")
            setIsLoggedIn(false)
        }
    })

    return ( 
        <nav className="navbar">
            <Link to="/"><h1>Scamna</h1></Link>
            <div className="links">
                {!isLoggedIn && <Link to="/signup">Sign up</Link>}
                {!isLoggedIn && <Link to="/login">Log in</Link>}
                {isLoggedIn && <Link to ="/profile">Profile</Link>}
                {isLoggedIn && <Link to="/" onClick={handleLogout}>Sign out</Link>}
                {isLoggedIn && <Link to="/newPost">New Post</Link>}
            </div>
        </nav>
     );
}
 
export default Navbar;