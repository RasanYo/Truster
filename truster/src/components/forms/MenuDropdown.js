import "../../styles/menuDropdown.css"
import { Link } from "react-router-dom";

const MenuDropdown = ({children}) => {
    return ( 
        <div className="dropdown">
            <button className="dropbtn"></button>
            <div className="dropdown-content">
                {children}
            </div>
        </div>
     );
}
 
export default MenuDropdown;