import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from "leaflet";
import logoMap from './../../../Ressources/SVG/logoMap.svg'
import React from "react";
import { Geolocation } from '@capacitor/geolocation';

const currentPosition = async () => {
    return await Geolocation.getCurrentPosition();
}
export const Map = () => {

    // let data = undefined

    // fetchData().then((fetchedData) => {
    //     console.log(fetchedData);
    //     if (fetchedData != undefined) {
    //         data = fetchedData;

    //         data.data.forEach((item: any) => {
    //             const lat = item.address.latitude;
    //             const lng = item.address.longitude;

    //             console.log("dump")

    //             const greenIcon = L.icon({
    //                 iconUrl: logoMap,
    //                 iconSize: [38, 95], // size of the icon
    //             });
    //             L.marker([lat, lng], { icon: greenIcon }).addTo(map);

    //         });
    //     }
    // });



    const handleClick = (e: L.LeafletMouseEvent, map: L.Map) => {
        const { lat, lng } = e.latlng;
        const greenIcon = L.icon({
            iconUrl: logoMap,
            iconSize: [38, 95], // size of the icon
        });
        L.marker([lat, lng], { icon: greenIcon }).addTo(map);
    };

    return (
        <MapContainer center={[46.603354, 1.888334]} zoom={6} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler handleClick={handleClick} />
        </MapContainer>
    );
};

// Fonction pour récupérer les données de l'API
// const fetchData = async () => {
//     try {
//         const res = await fetch('http://localhost:3000/plants', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZXMiOlsiT1dORVIiLCJCT1RBTklTVCIsIkdBUkRJQU4iXSwiaWF0IjoxNzE2NTQ1MjU0LCJleHAiOjE3MTY1NDYxNTR9.E_OtJ5AN5b97ZHZyyRmonZ46dHsQDxakpBBfKGtLWXY"}`

//             },
//         });
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return await res.json();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//     }
// };


const MapClickHandler: React.FC<{ handleClick: (e: LeafletMouseEvent, map: L.Map) => void }> = ({ handleClick }) => {

    const map = useMapEvents({
        click(e: LeafletMouseEvent) {
            handleClick(e, map);
        },
    });

    currentPosition()
        .then((data) => {
            map.setView([data.coords.latitude, data.coords.longitude], 19)
            L.marker([data.coords.latitude, data.coords.longitude]).addTo(map)
                .bindPopup('Je suis ici ! <button class="bg-amber-400 p-2 rounded">TEST</button>')
                .openPopup();
        })

    return null;
};
