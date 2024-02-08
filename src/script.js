import {Model} from './models/model.js';
import {View} from './views/view.js';
// import {Controller} from '/controllers/Controller.js';

let model = new Model();
let view = new View();
// let controller = new Controller();

// Ajouter les observateurs au modèle
model.addObserver(view);
// model.addObserver(controller);

// Simuler un changement dans le modèle
// model.notifyObservers('Nouvelles données à afficher');

// let path = window.location.pathname;
// if(path === '/' || path === '/home'){
//     // location.href = '/src/pages/home.html';
//     view.showPage('home');
// }else if(path === '/docs') {
//     location.href = '/src/pages/docs.html';
// }


