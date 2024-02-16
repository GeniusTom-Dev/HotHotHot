export class DataAccess {

    constructor() {
        this.initDb();


    }

    initDb() {
        const request = indexedDB.open("dbTemp", 3);
        request.onerror = (event) => {
            // console.log("error: " + event.target.errorCode);
        };

        request.onupgradeneeded = (event) => {
            this.db = event.target.result;
            this.initStore();
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
        };
    }

    initStore() {
        if (!this.db.objectStoreNames.contains('temp')) {
            const objectStore = this.db.createObjectStore("temp");
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
        const request = this.db.transaction(["temp"], "readwrite")
            .objectStore("temp")
            .add(data);
        request.onsuccess = (event) => {
            console.log("add success");
        };
    }

    getItem(id) {
        const transaction = this.db.transaction(["temp"]);
        const objectStore = transaction.objectStore("temp");
        const request = objectStore.get(id);
        request.onerror = (event) => {
            // console.log("error: " + event.target.errorCode);
        };
        request.onsuccess = (event) => {
            // Do something with the request.result!
        };

    }

    updateItem(data) {
        const request = this.db.transaction(["temp"], "readwrite")
            .objectStore("temp")
            .put(data);
        request.onsuccess = (event) => {
            // console.log("update success");
        };

    }

    deleteItem(id) {
        const request = this.db.transaction(["temp"], "readwrite")
            .objectStore("temp")
            .delete(id);
        request.onsuccess = (event) => {
            // console.log("delete success");
        };

    }

}