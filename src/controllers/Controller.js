// import {Graph} from "../view/Graph";

export class Controller {

    constructor(dataAccess) {
        this.inTemperature = 0;
        this.outTemperature = 0;
        this.dataAccess = dataAccess;


        this.dataAccess.getAllItems().then(items => {
            console.log("All items:", items);
        }).catch(error => {
            console.error("Error getting all items:", error);
        })


        this.baliseInTemperature = document.getElementById("baliseInTemperature");
        this.baliseOutTemperature = document.getElementById("baliseOutTemperature");

        this.temperatures = [];
        // this.getTemperatures();

        for (let i = 0; i < this.temperatures.length; i++) {
            console.log(this.temperatures[i]);
        }

        const graph = new Graph('lineChart');
        console.log('aaaaaaaaaaaa');
        graph.drawGraph([0, 4, 7,8,9,10,11,12,13,14,15, 20, 2, 6, -6, 9, 10, 5, 15,12,13,-13,0, 4, 7,8,9,10,11,12,13,14,15, 20, 2, 6, -6, 9, 10, 5, 15,12,13,-13,0, 4, 7,8,9,10,11,12,13,14,15, 20, 2, 6, -6, 9, 10, 5, 15,12,13,-13]);

    }

    getTimeStamps() {
        const currentDate = new Date();
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        let timestamps = [];
        for (let i = 0; i < 24; i++) {
            for(let j = 0; j < 2; j+=1) {
                const hourDate = new Date(currentDate);
                hourDate.setHours(i);
                if(j === 0) {
                    hourDate.setMinutes(0);
                }else {
                    hourDate.setMinutes(30);
                }
                const timestamp = hourDate.getTime();
                timestamps.push(timestamp);
            }
        }
        return timestamps;
    }

    getTemperatures() {
        let timestamps = this.getTimeStamps();
        for (let i = 0; i < timestamps.length-1; i++) {
            this.temperatures.push(this.dataAccess.getFirstByTimestampRange(timestamps[i], timestamps[i+1]));
        }
    }

    update(data) {
        //{"HotHotHot":"Api v1.0","capteurs":
        // [{"type":"Thermique","Nom":"interieur","Valeur":"15.8","Timestamp":1707406883},
        // {"type":"Thermique","Nom":"exterieur","Valeur":"14.8","Timestamp":1707406883}]
        // }
        for (let i = 0; i < data["capteurs"].length; i++) {
            switch (data["capteurs"][i]["Nom"]) {
                case "interieur":
                    this.inTemperature = data["capteurs"][i]["Valeur"];
                    break;
                case "exterieur":
                    this.outTemperature = data["capteurs"][i]["Valeur"];
                    break;
            }
        }
        this.showInTemperature();
        this.showOutTemperature();

        // const data = [0, 4, 8, 20, 2, -5, 6, 3, 9, 10, 5, 15,12,13,-12];
        // const graph = new Graph('lineChart');
        // graph.drawGraph(data);
    }

    showInTemperature() {
        this.baliseInTemperature.innerHTML = `${this.inTemperature} °C`;
    }

    showOutTemperature() {
        this.baliseOutTemperature.innerHTML = `${this.outTemperature} °C`;
    }
}