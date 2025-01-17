document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.querySelector('.container.mt-5 .row');

    // Charger le fichier JSON avec fetch
    fetch('/contenu/projet/project.json')
        .then(response => response.json())
        .then(projects => {
            // Générer les cartes de projet à partir des données du JSON
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('col-md-4', 'mb-4');
                projectCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${project.year}</h6>
                            <p class="card-text">${project.description}</p>
                            <!-- Bouton pour ouvrir le modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#experienceModal${project.id}">
                                Voir les détails
                            </button>
                            <!-- Lien vers le livrable PDF -->
                            <a href="${project.pdfLink}" class="btn btn-secondary mt-3" target="_blank">
                                Télécharger le livrable PDF
                            </a>
                        </div>
                    </div>
                `;
                projectContainer.appendChild(projectCard);

                // Ajouter le modal pour chaque projet
                const modal = document.createElement('div');
                modal.classList.add('modal', 'fade');
                modal.id = `experienceModal${project.id}`;
                modal.tabIndex = -1;
                modal.setAttribute('aria-labelledby', `experienceModal${project.id}Label`);
                modal.setAttribute('aria-hidden', 'true');
                modal.innerHTML = `
                    <div class="modal-dialog" style="max-width: 80vw; max-height: 80vh;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="experienceModal${project.id}Label">${project.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <iframe src="${project.pdfLink}" width="100%" height="900px"></iframe>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        });
});
