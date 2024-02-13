import {Controller} from "./controllers/";
import {TemperatureObservable} from "./models/";
import {Graph} from "./view/";

let controller = new Controller();
let temperature = new TemperatureObservable();
temperature.addObserver(controller);

document.getElementById("dataButton").onclick = function() {
    document.getElementById('graph').style.display = 'none';
    document.getElementById('data').style.display = 'flex'; 
    const data = [0,4,8,20,2,5,6,3,9,10,5,15];
    const graph = new Graph('lineChart');
    graph.drawGraph(data);
};

document.getElementById("graphButton").onclick = function() {
    document.getElementById('data').style.display = 'none'; 
    document.getElementById('graph').style.display = 'flex';

    const data = [0,4,8,20,2,5,6,3,9,10,5,15];
    const graph = new Graph('lineChart');
    graph.drawGraph(data);
};