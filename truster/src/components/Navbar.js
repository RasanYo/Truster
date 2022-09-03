import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import '../styles/navbar.css'

const Navbar = () => {

    const {user, isLoggedIn} = useContext(UserContext)


    const handleLogout = e => {
        user.logout()
    }
 

    return ( 
        <nav className="navbar">
            <h1>Truster</h1>
            <div className="actions">
                <Link to="/login">Make a visit</Link>
                <Link to="/login">Post a visit</Link>
            </div>
            <div className="links">
                <Link to="/about">About</Link>
                <Link to="/faq">FAQ</Link>
                {!isLoggedIn && <Link to="/login">Log in</Link>}
                {!isLoggedIn && <Link className="signup-button" to="/signup">Sign Up</Link>}
                {isLoggedIn && <Link to="/" onClick={handleLogout}>Sign out</Link>}
            </div>
        </nav>
     );
}
 
export default Navbar;