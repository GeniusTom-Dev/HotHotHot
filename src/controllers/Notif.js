export class Notif {
    constructor(registration) {
        this.registration = registration;
        this.notificationBubble = document.getElementById('notificationBubble');
        this.notificationMessages = document.getElementById('notificationMessages');
        this.notificationCount = document.getElementById('notificationCount');
        this.notifications = []

        this.notificationBubble.addEventListener('click', () => {
            this.notificationMessages.classList.toggle('hidden');
            this.updateNotificationCount("clear");
        });
    }

    sendNotification = async (message) => {
        if (Notification.permission === 'granted') {
            this.showNotification(message);
        } else {
            if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    this.showNotification(message);
                }
            }
        }
    };

    update(data) {
        //{"HotHotHot":"Api v1.0","capteurs":
        // [{"type":"Thermique","Nom":"interieur","Valeur":"15.8","Timestamp":1707406883},
        // {"type":"Thermique","Nom":"exterieur","Valeur":"14.8","Timestamp":1707406883}]
        // }
        let addCounter = 0;
        for (let i = 0; i < data["capteurs"].length; i++) {
            switch (data["capteurs"][i]["Nom"]) {
                case "interieur":
                    if (data["capteurs"][i]["Valeur"] > 50) {
                        this.notifications.push("alerte : Baissez le chauffage !")
                        this.sendNotification("alerte : Baissez le chauffage !").then(r => null)
                        addCounter++;
                    } else if (data["capteurs"][i]["Valeur"] > 22) {
                        this.notifications.push("alerte : Appelez les pompiers ou arrêtez votre barbecue !")
                        this.sendNotification("alerte : Appelez les pompiers ou arrêtez votre barbecue !").then(r => null)
                        addCounter++;
                    } else if (data["capteurs"][i]["Valeur"] < 12) {
                        this.notifications.push("alerte : montez le chauffage ou mettez un gros pull !")
                        this.sendNotification("alerte : montez le chauffage ou mettez un gros pull !").then(r => null)
                        addCounter++;
                    } else if (data["capteurs"][i]["Valeur"] < 0) {
                        this.notifications.push("alerte : canalisations gelées, appelez SOS plombier et mettez un bonnet !")
                        this.sendNotification("alerte : canalisations gelées, appelez SOS plombier et mettez un bonnet !").then(r => null)
                        addCounter++;
                    }
                    break;
                case "exterieur":
                    if (data["capteurs"][i]["Valeur"] > 35) {
                        this.notifications.push("alerte : Hot Hot Hot !")
                        this.sendNotification("alerte : Hot Hot Hot !").then(r => null)
                        addCounter++;
                    } else if (data["capteurs"][i]["Valeur"] < 0) {
                        this.notifications.push("alerte : Banquise en vue !")
                        this.sendNotification("alerte : Banquise en vue !").then(r => null)
                        addCounter++;
                    }
                    break;
            }
        }

        if (addCounter > 0) {
            this.updateNotificationCount()
        }


    }

    showNotification = body => {
        const title = 'Alerte HotHotHot';

        const payload = {
            body
        };

        if ('showNotification' in this.registration) {
            let notification = this.registration.showNotification(title, payload);
        } else {
            let notification = new Notification(title, payload);
        }
    };

    updateNotificationCount(mode = null) {
        let count = this.notifications.length
        this.notificationCount.innerText = count.toString();
        this.notificationBubble.style.backgroundColor = count > 0 ? "red" : "white"
        this.notificationBubble.style.color = count > 0 ? "white" : "black"

        let message = "";

        for (let i = 0; i < this.notifications.length; i++) {
            message += this.notifications[i]

            if (i < this.notifications.length - 1) {
                message += "<hr>"
            }
        }

        this.notificationMessages.innerHTML = message;

        if (mode === "clear") {
            this.notifications = [];
            this.notificationCount.innerText = "0";
        }
    }

}