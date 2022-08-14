import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DBClientContext } from "../App";

const Navbar = () => {

    const client = useContext(DBClientContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    client.auth().onAuthStateChanged(user => {
        if (user) {
            setIsLoggedIn(true)
        }
    })

    return ( 
        <nav className="navbar">
            <h1>Scamna</h1>
            <div className="links">
                <Link to="/signup">Sign up</Link>
                <Link to="/login">Log in</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;