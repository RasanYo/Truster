import "../../styles/menuDropdown.css"

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