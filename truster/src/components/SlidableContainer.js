import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import "../styles/slidablecontainer.css"

const SlidableContainer = ({
    leftComponent, 
    rightComponent,
    menuSwitch
}) => {

    const [menuHeight, setMenuHeight] = useState(null)

    function calcHeight(el) {
        let height = el.offsetHeight
        setMenuHeight(height)
    }

    return ( 
        <div style={{ height: menuHeight, transition: 'height .5s ease' }}>
            <CSSTransition 
                in={menuSwitch} 
                unmountOnExit 
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                {leftComponent}
            </CSSTransition>

            <CSSTransition 
                in={!menuSwitch} 
                unmountOnExit 
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                {rightComponent}
            </CSSTransition>
        </div>
     );
}
 
export default SlidableContainer;