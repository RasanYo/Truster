import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Scamna</h1>
            <div className="links">
                <Link to="/signup">Sign up</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;