import { Icon } from '@iconify/react';
import { GoogleMap, useJsApiLoader , InfoBox, Marker} from '@react-google-maps/api';
import { memo, useCallback, useState } from 'react';

const containerStyle = {
  width: '80%',
  height: '400px',
  marginLeft : '80px'
};



function MyComponent({ location, zoomLevel}) {

    const center = {
        lat: location[1],
        lng: location[2]
      };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  })

  const [map, setMap] = useState(null)
  const [isIconHovered,setIsIconHovered] = useState(false)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const options = { closeBoxURL: '', enableEventPropagation: true };

    const onLoadInfoBox = infoBox => {
    console.log('infoBox: ', infoBox)
    };

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    
      <GoogleMap
        zoom={zoomLevel}
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {console.log(zoomLevel)}
        {isIconHovered && <InfoBox
            onLoad={onLoadInfoBox}
            options={options}
            position={center}
            >
            <div style={{ backgroundColor: 'gray', opacity: 0.85, padding: 12 }}>
                <div style={{ fontSize: 16, fontColor: `#000000`, width:'200px' }}>
                {location[0]}
                </div>
            </div>
        </InfoBox>}
        <Marker position={center} onClick={() => {
            isIconHovered ? setIsIconHovered(false) : setIsIconHovered(true)
        }} title={location[0]}></Marker>
        <></>
      </GoogleMap>
  ) : <></>
}

export default memo(MyComponent)