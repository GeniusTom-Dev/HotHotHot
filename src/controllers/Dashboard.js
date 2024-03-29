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
            window.location.href = "/";
        };

        this.buttonDocs.onclick = () => {
            window.location.href = "/src/view/docs.html";
        };
    }

    updateDateHour() {
        let now = new Date();
        this.showDate.innerHTML = now.toLocaleDateString('fr-FR');
        this.showHour.innerHTML = now.toLocaleTimeString('fr-FR');
    }
}