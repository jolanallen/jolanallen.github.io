// Fonction pour charger le contenu d'un fichier Markdown et l'afficher dans la modal
function loadProjectContent(fileName) {
    // Utilisation de fetch pour charger le fichier Markdown
    fetch(fileName)
        .then(response => {
            // Vérifier si le fichier a bien été trouvé
            if (!response.ok) {
                throw new Error("Fichier introuvable");
            }
            return response.text();
        })
        .then(mdContent => {
            // Convertir le contenu Markdown en HTML
            const htmlContent = marked(mdContent); // `marked` est une bibliothèque pour convertir le Markdown en HTML
            // Insérer le contenu dans la modal
            document.getElementById("projectContent").innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier Markdown:", error);
            document.getElementById("projectContent").innerHTML = "<p>Erreur lors du chargement du contenu du projet.</p>";
        });
}
