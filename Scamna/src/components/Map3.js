import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon="ic:twotone-push-pin" className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel, id }) => {return (
  <div className="map">

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4',  id: {id} }}
        defaultCenter={{lat : 37.42216, lng : -122.08427}}
        center={{lat : location[1], lng : location[2]}}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location[1]}
          lng={location[2]}
          text={location[0]}
        />
      </GoogleMapReact>
    </div>
  </div>
)}

export default Map;
