export class DataAccess {

    constructor() {
        let db = this.initDb();
        if(db){
            this.db = db;
        }

    }

    initDb(){
        const request = indexedDB.open("dbTemp", 3);
        request.onerror = function(event) {
            console.log("error: " + event.target.errorCode);
            return false;
        };

        request.onsuccess = function(event) {
            return request.result;
        };

        return false;
    }

    addItem(data){

    }

    getItem(id){

    }

    updateItem(data){

    }

    deleteItem(id){

    }

}