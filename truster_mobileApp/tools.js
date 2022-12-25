const EARTH_RADIUS_KM = 6371;

const deg2rad = (degrees) => {
  return degrees * (Math.PI / 180);
}

export const TOOLS = {
    getDistanceBetweenPoints: (geohash1, geohash2) => {
        const [lat1, lng1] = ngeohash.decode(geohash1);
        const [lat2, lng2] = ngeohash.decode(geohash2);
        
        const dLat = deg2rad(lat2 - lat1);
        const dLng = deg2rad(lng2 - lng1);
        
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return EARTH_RADIUS_KM * c;
    }
}

 
