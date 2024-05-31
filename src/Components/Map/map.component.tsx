import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from "react";
import { MapCustom } from '../../Service/Leaflet/MapCustom.services';
import L from 'leaflet';
import logoMap from './../../../Ressources/SVG/logoMap.svg';
import { FeatureCollection, Feature, Point } from 'geojson';
import { IPlantProperties } from '../../Interface/Leaflet/IPlantProperties';


const Map = () => {
    const mapContainerRef = useRef(null);

    // Fonction pour récupérer les données de l'API
    const fetchData = async () => {
        try {
            const res = await fetch('https://api.plantcura.online/plants', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmZyIiwicm9sZXMiOlsiT1dORVIiLCJCT1RBTklTVCIsIkdBUkRJQU4iXSwiaWF0IjoxNzE2OTgzMDgyLCJleHAiOjE3MTc1ODc4ODJ9.JQCvVtCAOu2b35t0STLFIAofdyPJyO6Lt1mJawHKZO4"}`

                },
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return await res.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    useEffect(() => {
        let mapInstance: MapCustom;

        if (mapContainerRef.current) {
            mapInstance = new MapCustom();

            const greenIcon = L.icon({
                iconUrl: logoMap,
                iconSize: [38, 95], // size of the icon
            });

            fetchData().then((fetched) => {
                if (fetched != undefined) {

                    fetched.data.forEach((item: any) => {
                        if (item != null && item != undefined) {
                            const lat = item.address.latitude;
                            const lng = item.address.longitude;
                            const type = item.name;
                            const id = item.id;
                            const city = item.address.city;
                            const street = item.address.street;
                            const status = item.status.name;
                            const specie = item.species.name;
                            const zip = item.address.zip;

                            console.log(item);

                            const geojsonData: FeatureCollection<Point, IPlantProperties> = {
                                "type": "FeatureCollection",
                                "features": [
                                    {
                                        "type": "Feature",
                                        "geometry": {
                                            "type": "Point",
                                            "coordinates": [lng, lat]
                                        },
                                        "properties": {
                                            "id": id,
                                            "type": type,
                                            "specie": specie,
                                            "status": status,
                                            "address": {
                                                "city": city,
                                                "street": street,
                                                "zip": zip
                                            }
                                        }
                                    }
                                ]
                            };

                            function onEachFeature(feature: Feature<Point, IPlantProperties>, layer: L.Layer) {
                                if (feature.properties) {
                                  const popupContent = `
                                    <div>
                                      <p><strong>Type:</strong> ${feature.properties.type}</p>
                                      <p><strong>Race:</strong> ${feature.properties.specie}</p>
                                      <p><strong>Statut:</strong> ${feature.properties.status}</p>
                                      <p><strong>Adresse:</strong> ${feature.properties.address.zip} ${feature.properties.address.city}, ${feature.properties.address.street}</p>
                                    </div>
                                  `;
                                  (layer as L.Marker).bindPopup(popupContent);
                                }
                              }

                            L.geoJSON(geojsonData, {
                                onEachFeature: onEachFeature,
                                pointToLayer: function (_feature, latlng) {
                                  return L.marker(latlng, { icon: greenIcon });
                                }
                              }).addTo(mapInstance.getMap());
                        }
                    });
                }
            });

            mapInstance.getMap().on("click", (e: L.LeafletMouseEvent) => {
                console.log(e)
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

export default Map;
