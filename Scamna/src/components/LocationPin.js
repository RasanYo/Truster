import { Icon } from '@iconify/react'

const LocationPin = ({text}) => {
    return ( 
        <div className="pin">
            <Icon icon="mdi-light:home" className="pin-icon" />
            <p className="pin-text">{text}</p>
        </div>
     );
}
 
export default LocationPin;