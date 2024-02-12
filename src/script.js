import {Controller} from "./controllers/";
import {Temperature} from "./models/";

let controller = new Controller();
let temperature = new Temperature(controller);