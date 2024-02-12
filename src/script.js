import {Controller} from "./controllers/";
import {TemperatureObservable} from "./models/";

let controller = new Controller();
let temperature = new TemperatureObservable();
temperature.addObserver(controller);