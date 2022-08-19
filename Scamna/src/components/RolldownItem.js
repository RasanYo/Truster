import { useState } from "react";

const RolldownItem = ({preview, body}) => {

    const [showFull, setShowFull] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        if (e.target.classList.contains("title")) setShowFull(!showFull)
    }

    return ( 
        <div className="rolldown-item">
            <div className="preview" onClick={handleClick}>
                {preview}
            </div>
            <div className="body" style={{display: showFull ? 'block' : 'none'}}>
                {body}
            </div>
        </div>
     );
}


 
export default RolldownItem;