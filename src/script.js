import {Controller} from "./controllers/Controller.js";
import {Dashboard} from "./controllers/Dashboard.js";
import {TemperatureObservable} from "./models/TemperatureObservable.js";
import {Graph} from "./view/Graph.js";
import {DataAccess} from "./data/DataAccess.js";

let controller = new Controller();

let temperature = new TemperatureObservable();
let dataAccess = new DataAccess()
temperature.addObserver(controller);
temperature.addObserver(dataAccess);

let dashboard = new Dashboard();
// dashboard.getData().then(r => {
//     console.log(r);
// })


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./serviceWorker.js')
        .then(() => { console.log('Service Worker Registered'); });
}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});
