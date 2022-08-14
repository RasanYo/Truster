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
            <h1>Scamna</h1>
            <div className="links">
                {!isLoggedIn && <Link to="/signup">Sign up</Link>}
                {!isLoggedIn && <Link to="/login">Log in</Link>}
                {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
            </div>
        </nav>
     );
}
 
export default Navbar;