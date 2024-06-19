import { Position, Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';


export class MapCustom {
    private MAP: L.Map;
    private RENDERER: L.Renderer;
    private CONVERT = L.CRS.EPSG3857;
    private CURRENT_POSITION: Promise<Position>;

    constructor() {
        const mapOptions = {
            zoomControl: true,
            zoom: 6,
            maxZoom: 18,
            minZoom: 6,
            resolutions: [
                8192, 4096, 2048, 1024, 512, 256, 128,
                64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125
            ],
            preferCanvas: true
        };

        this.MAP = L.map('map', mapOptions).setView(/* Metres to degrees */ L.CRS.EPSG3857.unproject(new L.Point(585093.9077489, 5978631.616268034)));

        // OpenStreet Map version (free)
        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ).addTo(this.MAP);

        this.RENDERER = L.canvas({ padding: 0.5, tolerance: 10 });

        this.CURRENT_POSITION = Geolocation.getCurrentPosition();

    }

    public getMap(): L.Map {
        return this.MAP;
    }


    public getRenderer(): L.Renderer {
        return this.RENDERER;
    }

    public getConvert(): L.CRS {
        return this.CONVERT;
    }

    public async getCurrentPosition(): Promise<Position> {
        return await this.CURRENT_POSITION;
    }

}