export class Model {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notifyObservers(data) {
        this.observers.forEach(observer => observer.update(data));
    }


}

let model = new Model();
function newData() {
    let data = Math.random();
    model.notifyObservers(data);
}
setInterval(newData, 1000)
