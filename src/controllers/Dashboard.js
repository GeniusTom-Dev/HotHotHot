export class Dashboard {
    constructor() {

        this.dashboard = document.getElementById('dashboard');
        this.history = document.getElementById('history');

        this.switchDashboardButton = document.getElementById('switchDashboardButton');
        this.switchHistoryButton = document.getElementById('switchHistoryButton');

        this.ongletDashboard = document.getElementById('ongletDashboard');
        this.ongletHistory = document.getElementById('ongletHistory');

        this.showDate = document.getElementById('showDate');
        this.showHour = document.getElementById('showHour');

        this.buttonHomePage = document.getElementById('buttonHomePage');
        this.buttonDocs = document.getElementById('buttonDocs');

        setInterval(() => {
            this.updateDateHour();
        }, 500);

        this.initActions();

    }

    initLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    const coords = position.coords.latitude + "," + position.coords.longitude;
                    resolve(coords);
                }, err => {
                    reject('La géolocalisation a échoué: ' + err.message);
                });
            } else {
                reject('La géolocalisation n\'est pas disponible');
            }
        });
    }

    async getData() {
        const reponse = await fetch(this.callLink);
        const data = await reponse.json();
        const dataLocation = data.current.condition.text;
        // console.log(dataLocation);
    }

    initActions() {
        this.switchDashboardButton.onclick = () => {
            this.dashboard.style.display = 'flex';
            this.history.style.display = 'none';
            this.ongletDashboard.classList.add("active");
            this.ongletHistory.classList.remove("active");
        };

        this.switchHistoryButton.onclick = () => {
            this.dashboard.style.display = 'none';
            this.history.style.display = 'flex';
            this.ongletDashboard.classList.remove("active");
            this.ongletHistory.classList.add("active");
        };

        this.buttonHomePage.onclick = () => {
            window.location.href = "index.html";
        };

        this.buttonDocs.onclick = () => {
            window.location.href = "docs.html";
        };
    }

    updateDateHour() {
        let now = new Date();
        this.showDate.innerHTML = now.toLocaleDateString('fr-FR');
        this.showHour.innerHTML = now.toLocaleTimeString('fr-FR');
    }
}