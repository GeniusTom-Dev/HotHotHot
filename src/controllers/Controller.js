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
    }

    update(data) {
        console.log(data);
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