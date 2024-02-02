export class HomeView {

    constructor() {
    }

    display(){
        document.body.innerHTML = `
            <h1>Home</h1>
            <a href="/docs">Vers la docs</a>
        `;
    }
}