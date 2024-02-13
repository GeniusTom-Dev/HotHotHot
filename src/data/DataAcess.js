export class DataAccess {

    constructor() {
        this.db = this.initDb();
        this.initStore();

    }

    initDb() {
        const request = indexedDB.open("dbTemp", 3);
        request.onerror = (event) => {
            // console.log("error: " + event.target.errorCode);
            return false;
        };

        request.onsuccess = (event) => {
            return request.result;
        };

        return false;
    }

    initStore() {
        const objectStore = this.db.createObjectStore("temp");
        objectStore.createIndex("origin", "origin", {unique: false});
        objectStore.createIndex("value", "value", {unique: false});
        objectStore.createIndex("timestamp", "timestamp", {unique: false});
    }

    addItem(data) {

    }

    getItem(id) {

    }

    updateItem(data) {

    }

    deleteItem(id) {

    }

}