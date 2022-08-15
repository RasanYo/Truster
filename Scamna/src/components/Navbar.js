import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DBClientContext } from "../App";
import A from "../images/A"

const Navbar = () => {

    const client = useContext(DBClientContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = e => {
        client.logOutCurrentUser()
    }

    const unsubscribe = client.auth.onAuthStateChanged(user => {
        if (user) {
            setIsLoggedIn(true)
        } else {
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
                {isLoggedIn && <Link to="/newpost">New Post</Link>}
                {isLoggedIn && <Link to="/myposts">My Posts</Link>}
            </div>
        </nav>
     );
}
 
export default Navbar;