import "../../styles/menuDropdown.css"
import { Link } from "react-router-dom";

const MenuDropdown = ({elements}) => {
    return ( 
        <div className="dropdown">
            <button className="dropbtn"></button>
            <div className="dropdown-content">
                {elements.map((elem,i) => {
                    return <Link classname={elem[2]} to={elem[1]} onClick={elem[3]}>{elem[0]}</Link>
                })}
            </div>
        </div>
     );
}
 
export default MenuDropdown;