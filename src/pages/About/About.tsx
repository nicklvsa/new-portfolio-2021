import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import './About.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlja2x2c2EiLCJhIjoiY2twcGowYnM0MjZnYTJ3b2d6dTN4Y2F0MyJ9.Sae6B1ZL7CiawZdNLILHQg';

interface AboutProps {
    dark: boolean;
}

const About = (props: AboutProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [lng, setLng] = useState<number>(40);
    const [lat, setLat] = useState<number>(76);
    const [zoom, setZoom] = useState<number>(3);

    useEffect(() => {
        if (props.dark) {
            map.current?.setStyle('mapbox://styles/mapbox/dark-v10')
        } else {
            map.current?.setStyle('mapbox://styles/mapbox/streets-v11')
        }
    }, [props.dark]);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current ?? '.map-container',
            style: props.dark ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.current?.on('load', () => {
            map.current?.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            
            map.current?.setTerrain({'source': 'mapbox-dem', 'exaggeration': 1.5});
             
            map.current?.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0],
                    'sky-atmosphere-sun-intensity': 15
                }
            });
        });
    });

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(Number(map.current?.getCenter().lng.toFixed(4)));
            setLat(Number(map.current?.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current?.getZoom().toFixed(2)));
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container"></div>
        </div>
    );
};

export default About;
