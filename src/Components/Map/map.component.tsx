import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, {LeafletMouseEvent} from "leaflet";
import logoMap from './../../../Ressources/SVG/logoMap.svg'
import React from "react";
import {Geolocation} from '@capacitor/geolocation';

const currentPosition = async () => {
    return await Geolocation.getCurrentPosition();
}
export const Map = () => {


    const handleClick = (e: L.LeafletMouseEvent, map: L.Map) => {
        const {lat, lng} = e.latlng;
        const greenIcon = L.icon({
            iconUrl: logoMap,
            iconSize: [38, 95], // size of the icon
        });
        L.marker([lat, lng], {icon: greenIcon}).addTo(map);
    };

    return (
        <MapContainer center={[46.603354, 1.888334]} zoom={6} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler handleClick={handleClick}/>
        </MapContainer>
    );
};


const MapClickHandler: React.FC<{ handleClick: (e: LeafletMouseEvent, map: L.Map) => void }> = ({handleClick}) => {

    const map = useMapEvents({
        click(e: LeafletMouseEvent) {
            handleClick(e, map);
        },
    });

    currentPosition()
        .then((data) => {
            map.setView([data.coords.latitude, data.coords.longitude], 19)
            L.marker([data.coords.latitude, data.coords.longitude]).addTo(map);
        })

    return null;
};
