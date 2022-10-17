import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import '../styles/navbar.css'
import MenuDropdown from "./forms/MenuDropdown"


const Navbar = ({setFirstPage}) => {

    const {user} = useContext(UserContext)
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

                {!user.isLoggedIn() && <Link to="/login">Log in</Link>}
                {!user.isLoggedIn() && <Link className="signup-button" to="/signup">Sign Up</Link>}
                {user.isLoggedIn() && <MenuDropdown>
                        <Link to="" onClick={handleLogout}>Sign out</Link>
                        <Link to="/account" >Profile</Link>
                        <Link to="/account" >My Posts</Link>
                        <Link to="/account" >My Visits</Link>
                    </MenuDropdown>}
            </div>
        </nav>
     );
}
 
export default Navbar;