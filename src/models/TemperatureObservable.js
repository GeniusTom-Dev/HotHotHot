import {DataApi} from "./DataApi.js";

export class TemperatureObservable {


    constructor() {
        this.webSocketUrl = 'wss://ws.hothothot.dog:9502';
        this.initWebsocket();
        this.api = new DataApi();
        this.initSystemTier()
        this.observers = [];
        this.lastWSSResult = null;
    }

    addObserver(controller) {
        this.observers.push(controller);
    }


    initWebsocket() {
        this.socket = new WebSocket(this.webSocketUrl);

        console.log(this.socket)

        this.socket.onopen = (event) => {
            this.socket.send("Je viens d'arriver");

            //{"HotHotHot":"Api v1.0","capteurs":
            // [{"type":"Thermique","Nom":"interieur","Valeur":"15.8","Timestamp":1707406883},
            // {"type":"Thermique","Nom":"exterieur","Valeur":"14.8","Timestamp":1707406883}]
            // }
            this.socket.onmessage = (event) => {
                this.lastWSSResult === null ? this.lastWSSResult = event.data : false
                this.analyzeData(event.data);
            }
        }
    }

    initSystemTier(){
        setInterval(() => {
            if(this.lastWSSResult === null){
                this.api.getTemperature().then(item => {
                    this.analyzeData(item)
                })
            }else{
                this.lastWSSResult = null;
            }
        }, 1200000) // 20 minutes
    }

    analyzeData(data) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].update(JSON.parse(data));
        }
    }
}