import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import '../styles/navbar.css'
import MenuDropdown from "./forms/MenuDropdown"


const Navbar = ({setFirstPage}) => {

    const {user, isLoggedIn} = useContext(UserContext)
    const navigate = useNavigate()


    const handleLogout = e => {
        user.logout().then(() => {
            console.log("User logged out")
            console.log(user)
        })
        
    }

    const handleTitle = e => {
        e.preventDefault()
        navigate("/")
    }
 

    return ( 
        <nav className="navbar">
            <h1 onClick={handleTitle}>Truster</h1>
            <div className="actions">
                <Link to="/login">Make a visit</Link>
                <Link to="/post">Post a visit</Link>
            </div>
            <div className="links">
                <Link to="/about">About</Link>
                <Link to="/faq">FAQ</Link>
                {!isLoggedIn && <Link to="/login">Log in</Link>}
                {!isLoggedIn && <Link className="signup-button" to="/signup">Sign Up</Link>}
                {isLoggedIn && <Link to="" onClick={handleLogout}>Sign out</Link>}
                {isLoggedIn && <MenuDropdown>
                        {/* <Link to="/" onClick={handleLogout}>Sign out</Link> */}
                        <Link to="/" onClick={handleLogout}>Sign out</Link>
                        <Link to="/account" onClick={() => setFirstPage("Profile")}>Profile</Link>
                        <Link to="/account" onClick={() => setFirstPage("My Posts")}>My Posts</Link>
                        <Link to="/account" onClick={() => setFirstPage("My Visits")}>My Visits</Link>
                    </MenuDropdown>}
            </div>
        </nav>
     );
}
 
export default Navbar;