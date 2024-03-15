import { Router, RouterClass, Routes } from "../../Interface/AccountRoutes/AccountRouter.interface";

export class AccountPanelRouter {
    router: Router;
    class: RouterClass

    constructor() {
        this.router = {
            routes: [Routes.Sharing, Routes.Settings],
            activeRouteIs: Routes.Sharing,
        };

        this.class = {
            btnPrimary: "btn-primary",
            btnActive: "btn-active"
        }
    }

    logRoutes() {
        console.log("Routes are : ", this.router.routes);
        console.log("The active route is : ", this.router.activeRouteIs);
    }

    switchToRoute(route: Routes) {
        this.router.activeRouteIs = route;
    }
}
