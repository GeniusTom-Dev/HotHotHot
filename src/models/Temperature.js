export class Temperature {

    constructor(controller) {
        this.controller = controller;
        this.webSocketUrl = 'wss://ws.hothothot.dog:9502';
        this.initWebsocket();
    }

    initWebsocket() {
        this.socket = new WebSocket(this.webSocketUrl);

        this.socket.onopen = (event) => {
            this.socket.send("Je viens d'arriver");

            this.socket.onmessage = (event) => {
                this.analyzeData(event.data);
            }
        }
    }

    analyzeData(data) {
        this.controller.update(JSON.parse(data));
    }
}