import {Controller, Dashboard} from "./controllers/index.js";
import {TemperatureObservable} from "./models/index.js";
import {Graph} from "./view/index.js";

let controller = new Controller();
let temperature = new TemperatureObservable();
temperature.addObserver(controller);

let dashboard = new Dashboard();

// dashboard.getData().then(r => {
//     console.log(r);
// })

// document.getElementById("dataButton").onclick = () => {
//     document.getElementById('graph').style.display = 'none';
//     document.getElementById('data').style.display = 'flex';
// };
//
document.getElementById("ongletHistory").onclick = () => {
    const data = [0, 4, 8, 20, 2, -5, 6, 3, 9, 10, 5, 15,12,13,-12];
    const graph = new Graph('lineChart');
    graph.drawGraph(data);
};


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
