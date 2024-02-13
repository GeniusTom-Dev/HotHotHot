import {Controller} from "./controllers/index.js";
import {TemperatureObservable} from "./models/index.js";
import {Graph} from "./view/index.js";

let controller = new Controller();
let temperature = new TemperatureObservable();
temperature.addObserver(controller);

document.getElementById("dataButton").onclick = function() {
    document.getElementById('graph').style.display = 'none';
    document.getElementById('data').style.display = 'flex';
};

document.getElementById("graphButton").onclick = function() {
    document.getElementById('data').style.display = 'none'; 
    document.getElementById('graph').style.display = 'flex';

    const data = [0,4,8,20,2,5,6,3,9,10,5,15];
    const graph = new Graph('lineChart');
    graph.drawGraph(data);
};
