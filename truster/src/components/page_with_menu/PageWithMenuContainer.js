import { useEffect, useState } from "react";

const PageWithMenuContainer = ({
    children,
    linkProps={},
    startPage=null
}) => {

    function formatLink(link) {
        return link.toLowerCase().replace(/ /g, '_')
    }

    const links = children.map(child => child.props.link)
    const formattedLinks = links.map(link => formatLink(link))
    const elements = children.map(child => child.props.element)

    const [activePage, setActivePage] = useState(startPage ? formatLink(startPage) : formattedLinks[0])

    // useEffect(() => {console.log(childrenProps)}, [])


    return ( 
        <div className="row-container">
            <div id="menu">
                {links.map((link, index) => {
                    return <div 
                        onClick={e => {
                            e.preventDefault()
                            setActivePage(formattedLinks[index])
                        }}
                        className={`menu-item ${activePage === formattedLinks[index] ? "menu-item-active" : "menu-item-unactive"}`}
                        key={index}
                        {...linkProps}
                    >
                        {link}
                    </div>
                })}
            </div>
            <div id="content">
                {elements.map((element, index) => {
                    return activePage === formattedLinks[index] ? <div key={index}>{element}</div> : null
                })}
            </div>
        </div>
     );
}
 
export default PageWithMenuContainer;
