export class View {

    update(data) {
        // Mettez à jour l'interface utilisateur en fonction des données
        console.log(`View received update: ${data}`);
    }

    showPage(page) {
        // console.log(`Fragment: ${page}`);
        // Charge et affiche la nouvelle page
        fetch(`src/pages/${page}.html`)
            .then(response => {
                return response.text();
            })
            .then(html => {
                document.body.innerHTML = html;
                // container.innerHTML = html;
            })
            .catch(error => {
                console.error(`Erreur de chargement de la page ${page}:`, error);
            });
    }

}