import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from "react";
import { MapCustom } from '../../Service/Leaflet/MapCustom.services';
import L from 'leaflet';
import logoMap from './../../../Ressources/SVG/logoMap.svg';
import { FeatureCollection, Feature, Point } from 'geojson';
import { getUserPlant } from '../../utils/API/Plants/APIPlants.service';
import { Plant } from '../../Interface/Plants/PlantsList.interface';


const Map = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        let mapInstance: MapCustom;

        if (mapContainerRef.current) {
            mapInstance = new MapCustom();

            const greenIcon = L.icon({
                iconUrl: logoMap,
                iconSize: [38, 95], // size of the icon
            });

            getUserPlant().then((fetched: any) => {
                fetched = fetched.data;
                if (fetched != undefined) {
                    const plantsByAddress = groupPlantsByAddress(fetched);

                    for (const address in plantsByAddress) {
                        const plants = plantsByAddress[address];
                        const latitude = plants[0].address.latitude;
                        const longitude = plants[0].address.longitude
                        const addressFull = `${plants[0].address.street}, ${plants[0].address.city}, ${plants[0].address.zip}`

                        const geojsonData: FeatureCollection<Point, any> = {
                            "type": "FeatureCollection",
                            "features": [
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [longitude, latitude]
                                    },
                                    "properties": {
                                        "address": addressFull,
                                        "plants": Object.keys(plants).length,
                                        "plantIds": plants.map((plant: Plant) => plant.id)
                                    }
                                }
                            ]
                        };

                        function onEachAddress(feature: Feature<Point, any>, layer: L.Layer) {
                            if (feature.properties) {
                                const plantIds = feature.properties.plantIds.join(',');
                                const popupContent = `
                                <div>
                                  <p><strong>Address:</strong> ${feature.properties.address}</p>
                                  <p><strong>Plants:</strong> ${feature.properties.plants}</p>
                                  <button><a href="/specific/${plantIds}">Access the plants</a></button>
                                </div>
                              `;
                                (layer as L.Marker).bindPopup(popupContent);
                            }
                        }

                        L.geoJSON(geojsonData, {
                            onEachFeature: onEachAddress,
                            pointToLayer: function (_feature, latlng) {
                                return L.marker(latlng, { icon: greenIcon });
                            }
                        }).addTo(mapInstance.getMap());
                    }
                }
            });

            mapInstance.getCurrentPosition()
                .then((data) => {
                    mapInstance.getMap().setView([data.coords.latitude, data.coords.longitude], 19)
                    L.marker([data.coords.latitude, data.coords.longitude]).addTo(mapInstance.getMap())
                        .bindPopup('Je suis ici !')
                        .openPopup();
                })
        }

        return () => {
            if (mapInstance) {
                mapInstance.getMap().remove();
            }
        };
    }, []);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div id="map" ref={mapContainerRef}></div>
        </div>
    );
};

function groupPlantsByAddress(plants: Plant[]) {
    const plantsByAddress: any = {};

    plants.forEach((plant: Plant) => {
        const address = `${plant.address.street}, ${plant.address.city}, ${plant.address.zip}`;
        if (!plantsByAddress[address]) {
            plantsByAddress[address] = [];
        }
        plantsByAddress[address].push(plant);
    });

    return plantsByAddress;
}

export default Map;
