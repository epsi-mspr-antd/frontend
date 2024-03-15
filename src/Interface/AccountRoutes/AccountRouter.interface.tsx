export enum Routes {
    Sharing = "Sharing",
    Settings = "Settings"
}

export interface Router {
    routes: Routes[];
    activeRouteIs: Routes;
}

export interface RouterClass {
    btnPrimary: string;
    btnActive: string;
}