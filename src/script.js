import {Controller} from "./controllers/Controller.js";
import {Dashboard} from "./controllers/Dashboard.js";
import {TemperatureObservable} from "./models/TemperatureObservable.js";
import {Graph} from "./view/Graph.js";
import {DataAccess} from "./models/DataAccess.js";
import {DataApi} from "./models/DataApi.js";
import {Notif} from "./controllers/Notif.js";

async function initializeDataAccess() {
    let dataAccess = new DataAccess();
    await dataAccess.initDb(); // Attend que la base de données soit initialisée
    return dataAccess;
}

let temperature = new TemperatureObservable();
const registration = await navigator.serviceWorker.getRegistration();
let notif = new Notif(registration);

temperature.addObserver(notif)


initializeDataAccess().then(dataAccess => {
    let controller = new Controller(dataAccess);
    temperature.addObserver(controller);
    temperature.addObserver(dataAccess);
}).catch(error => {
    console.error("Error initializing DataAccess:", error);
});

//
//let dashboard = new Dashboard();
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



