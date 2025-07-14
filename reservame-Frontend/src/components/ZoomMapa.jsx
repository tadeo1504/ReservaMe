import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

function ZoomMapa({ coords }) {
    const map = useMap();

    useEffect(() => {
        if (coords) {
            map.setView([coords.lat, coords.lon], coords.zoom || 16);
        }
    }, [coords, map]);

    return null;
}

export default ZoomMapa;