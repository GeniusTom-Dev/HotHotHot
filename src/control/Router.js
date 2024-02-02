import {HomeController, DocsController} from "../controller";
import {HomeView, DocsView} from "../view";
import {Route} from "./Route.js";

export class Router {
    constructor() {
        this.routes = new Map();
        this.addRoute()
    }

    addRoute() {
        // Route home
        this.routes.set('/', new Route('Home', '/', new HomeController, new HomeView));
        // Route docs
        this.routes.set('/docs', new Route('Docs', '/docs', new DocsController, new DocsView));
        // Route
    }

    showRoute(route) {
        console.log(route)
        const currentRoute = this.routes.get(route);
        if(currentRoute){
            const view = currentRoute.getView();
            view.display();
        }else {
            console.log('Route non trouvée');
        }
    }
}