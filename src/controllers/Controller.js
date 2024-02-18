import {Graph} from "/src/view/Graph.js";

export class Controller {

    constructor(dataAccess) {
        this.inTemperature = null;
        this.outTemperature = null;
        this.dataAccess = dataAccess;

        this.baliseInTemperature = document.getElementById("baliseInTemperature");
        this.baliseOutTemperature = document.getElementById("baliseOutTemperature");


        this.getLastTemperature("interieur").then((value) => {
            this.inTemperature = value.value;
            this.showInTemperature()
        })

        this.getLastTemperature("exterieur").then((value) => {
            this.outTemperature = value.value;
            this.showOutTemperature()
        })



        const indoorGraph = new Graph('indoorLineChart');
        this.getTemperatures("interieur").then(() => {
            indoorGraph.drawGraph(this.indoorTemperatures);
        });

        const outdoorGraph = new Graph('outdoorLineChart');
        this.getTemperatures("exterieur").then(() => {
            outdoorGraph.drawGraph(this.outdoorTemperatures);
        });


    }

    getTimeStamps() {
        const currentDate = new Date();
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        let timestamps = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 3; j += 1) {
                const hourDate = new Date(currentDate);
                hourDate.setHours(i);
                hourDate.setMinutes(j * 20);
                const timestamp = hourDate.getTime();
                timestamps.push(timestamp / 1000);
            }
        }
        return timestamps;
    }

    async getTemperatures(location) {
        let timestamps = this.getTimeStamps();
        this.indoorTemperatures = [];
        this.outdoorTemperatures = [];

        let promises = timestamps.slice(0, -1).map((timestamp, i) => {
            return this.dataAccess.getFirstByTimestampRange(timestamp, timestamps[i + 1], location).then(item => {
                if (item !== null) {
                    if (location === "interieur") {
                        this.indoorTemperatures.push(item["value"]);
                    } else {
                        this.outdoorTemperatures.push(item["value"]);
                    }
                }
            });
        });
        await Promise.all(promises);
    }

    async getLastTemperature(location) {
        return await this.dataAccess.getLast(location);
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
    }

    showInTemperature() {
        this.baliseInTemperature.innerHTML = `${this.inTemperature} °C`;
    }

    showOutTemperature() {
        this.baliseOutTemperature.innerHTML = `${this.outTemperature} °C`;
    }
}