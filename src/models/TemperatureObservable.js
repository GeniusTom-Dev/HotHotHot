export class TemperatureObservable {


    constructor() {
        this.webSocketUrl = 'wss://ws.hothothot.dog:9502';
        this.initWebsocket();
        this.observers = [];
        console.log("oui")
    }

    addObserver(controller) {
        this.observers.push(controller);
    }


    initWebsocket() {
        this.socket = new WebSocket(this.webSocketUrl);

        console.log(this.socket)

        this.socket.onopen = (event) => {
            this.socket.send("Je viens d'arriver");

            this.socket.onmessage = (event) => {
                console.log(event.data);
                this.analyzeData(event.data);
            }
        }
    }

    analyzeData(data) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].update(JSON.parse(data));
        }
    }
}