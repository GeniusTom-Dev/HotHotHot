export class Controller {

    constructor() {
        this.inTemperature = 0;
        this.outTemperature = 0;

        this.baliseInTemperature = document.getElementById("baliseInTemperature");
        this.baliseOutTemperature = document.getElementById("baliseOutTemperature");
    }
    update(data) {
        //{"HotHotHot":"Api v1.0","capteurs":
        // [{"type":"Thermique","Nom":"interieur","Valeur":"15.8","Timestamp":1707406883},
        // {"type":"Thermique","Nom":"exterieur","Valeur":"14.8","Timestamp":1707406883}]}
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
        this.baliseInTemperature.innerHTML = `In temperature: ${this.inTemperature}`;
    }

    showOutTemperature() {
        this.baliseOutTemperature.innerHTML = `Out temperature: ${this.outTemperature}`;
    }
}