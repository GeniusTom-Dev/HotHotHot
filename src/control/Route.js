export class Route {
    constructor(title, route, classController, classView) {
        this.title = title;
        this.route = route;
        this.classController = classController;
        this.classView = classView;
    }

    getView() {
        return this.classView;
    }

}