export class DataAccess {


    constructor() {
        this.db = null;
    }

    initDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("dbTemp", 3);
            request.onerror = (event) => {
                console.log("error: " + event.target.errorCode);
                reject(event.target.error);
            };

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                console.log(event.target.result);
                this.initStore();
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log(event.target.result);
                resolve();
            };
        });
    }

    initStore() {
        if (this.db && !this.db.objectStoreNames.contains('temp')) {
            const objectStore = this.db.createObjectStore("temp",{ autoIncrement: true });
            objectStore.createIndex("origin", "origin", {unique: false});
            objectStore.createIndex("value", "value", {unique: false});
            objectStore.createIndex("timestamp", "timestamp", {unique: false});

        }
    }

    update(data) {
        //{"HotHotHot":"Api v1.0","capteurs":
        // [{"type":"Thermique","Nom":"interieur","Valeur":"15.8","Timestamp":1707406883},
        // {"type":"Thermique","Nom":"exterieur","Valeur":"14.8","Timestamp":1707406883}]
        // }
        console.log("données reçues" + data["capteurs"].length)
        for (let i = 0; i < data["capteurs"].length; i++) {
            const item = {
                origin: data["capteurs"][i]["Nom"],
                value: data["capteurs"][i]["Valeur"],
                timestamp: data["capteurs"][i]["Timestamp"]
            };
            this.addItem(item);
        }
    }

    addItem(data) {
        if(this.db){
            const request = this.db.transaction("temp", "readwrite")
                .objectStore("temp")
                .add(data);

            request.onsuccess = ()=> {
                console.log(`New student added, email: ${request.result}`);
            }

            request.onerror = (err)=> {
                console.error(`Error to add new student: ${err}`)
            }
        }
    }

    getAllItems(){
        if(this.db) {
            const transaction = this.db.transaction(["temp"], "readonly");
            const objectStore = transaction.objectStore("temp");
            const request = objectStore.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };

                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }
    }

}