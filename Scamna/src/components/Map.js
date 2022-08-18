import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon="ic:twotone-push-pin" className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel }) => {return (
  <div className="map">

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4' }}
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

// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const Map = () => {
//     const defaultProps = {
//         center: {
//           lat: 10.99835602,
//           lng: 77.01502627
//         },
//         zoom: 11
//       };
    
//       return (
//         // Important! Always set the container height explicitly
//         <div>
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: "AIzaSyDESnQJUVxDZRs9_3gsMV9W_arspyJFrj4" }}
//             defaultCenter={defaultProps.center}
//             defaultZoom={defaultProps.zoom}
//           >
//             <AnyReactComponent
//               lat={59.955413}
//               lng={30.337844}
//               text="My Marker"
//             />
//           </GoogleMapReact>
//         </div>
//       );
// }
 
// export default Map;
