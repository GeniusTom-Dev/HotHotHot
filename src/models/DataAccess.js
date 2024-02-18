export class DataAccess {

    constructor() {
        this.db = null;
    }

    clearDataBase() {
        const transaction = this.db.transaction(["temp"], "readwrite");
        const objectStore = transaction.objectStore("temp");
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime() / 1000;
        const request = objectStore.openCursor();
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                if (cursor.value.timestamp < startOfDay || cursor.value.timestamp > endOfDay) {
                    console.log("Deleting item: ", cursor.value);
                    cursor.delete();
                }
                cursor.continue();
            }
        };
        request.onerror = (event) => {
            console.error(`Error deleting items: ${event.target.error}`);
        };
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
                this.initStore();
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };
        });
    }

    initStore() {
        if (this.db && !this.db.objectStoreNames.contains('temp')) {
            const objectStore = this.db.createObjectStore("temp", {autoIncrement: true});
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
        if (this.db) {
            const request = this.db.transaction("temp", "readwrite")
                .objectStore("temp")
                .add(data);

            request.onsuccess = () => {
                console.log(`donnée enregistrée : ${request.result}`);
            }

            request.onerror = (err) => {
                console.error(`Erreur lors de l'ajout de la donnée: ${err.target.errorCode}`)
            }
        }
    }

    getMinTemperature(location) {
        if (this.db) {
            const transaction = this.db.transaction(["temp"], "readonly");
            const objectStore = transaction.objectStore("temp");
            const index = objectStore.index("origin");
            const request = index.openCursor(IDBKeyRange.only(location), "prev");

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;

                    if (cursor) {
                        resolve(cursor.value);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }
    }

    getMaxTemperature(location) {
        if (this.db) {
            const transaction = this.db.transaction(["temp"], "readonly");
            const objectStore = transaction.objectStore("temp");
            const index = objectStore.index("origin");
            const request = index.openCursor(IDBKeyRange.only(location), "next");

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;

                    if (cursor) {
                        resolve(cursor.value);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }
    }

    getFirstByTimestampRange(startTimestamp, endTimestamp, location) {
        if (this.db) {
            const transaction = this.db.transaction(["temp"], "readonly");
            const objectStore = transaction.objectStore("temp");

            // Créer une plage IDBKeyRange pour spécifier la plage de timestamps
            const range = IDBKeyRange.bound(startTimestamp, endTimestamp);

            // Ouvrir un curseur pour parcourir les éléments dans la plage de timestamps
            const request = objectStore.index("timestamp").openCursor(range, "next");

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;

                    if (cursor) {
                        // Vérifier si "origin" est égal à "location"
                        if (cursor.value.origin === location) {
                            // Le curseur a trouvé le premier élément dans la plage qui correspond à "location"
                            resolve(cursor.value);
                        } else {
                            // Si "origin" n'est pas égal à "location", passer au prochain élément
                            cursor.continue();
                        }
                    } else {
                        // Aucun élément trouvé dans la plage
                        resolve(null);
                    }
                };

                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }
    }

    getLast(location) {
        if (this.db) {
            const transaction = this.db.transaction(["temp"], "readonly");
            const objectStore = transaction.objectStore("temp");
            const index = objectStore.index("origin");
            const request = index.openCursor(IDBKeyRange.only(location), "prev");

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;

                    if (cursor) {
                        resolve(cursor.value);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }
    }


}