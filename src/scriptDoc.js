import {TemperatureObservable} from "./models/TemperatureObservable.js";
import {DataAccess} from "./models/DataAccess.js";

let temperature = new TemperatureObservable();

async function initializeDataAccess() {
    let dataAccess = new DataAccess();
    await dataAccess.initDb(); // Attend que la base de données soit initialisée
    return dataAccess;
}

initializeDataAccess().then(dataAccess => {
    temperature.addObserver(dataAccess);
    dataAccess.clearDataBase();
}).catch(error => {
    console.error("Error initializing DataAccess:", error);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(() => {
            console.log('Service Worker Registered');
        });
}



let buttonHomePage = document.getElementById('buttonHomePage');
let buttonDocs = document.getElementById('buttonDocs');

buttonHomePage.onclick = () => {
    window.location.href = "/";
};

buttonDocs.onclick = () => {
    window.location.href = "/src/view/docs.html";
};

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'flex';

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
