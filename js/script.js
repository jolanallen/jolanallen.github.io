document.addEventListener("DOMContentLoaded", function() {
    // Charger le fichier JSON contenant les projets
    fetch('/data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            
            // Parcourir les projets et les afficher dans la page
            projects.forEach((project, index) => {
                // Créer l'élément de projet
                const projectCard = document.createElement('div');
                projectCard.classList.add('col-md-4');
                
                projectCard.innerHTML = `
                    <div class="card">
                        <img src="/projects/images/${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal${index}">Voir le projet</button>
                        </div>
                    </div>
                `;
                
                // Ajouter la carte du projet à la section des projets
                projectsContainer.appendChild(projectCard);
                
                // Créer le modal pour ce projet
                const modal = document.createElement('div');
                modal.classList.add('modal', 'fade');
                modal.id = `projectModal${index}`;
                modal.setAttribute('tabindex', '-1');
                modal.setAttribute('aria-labelledby', `projectModalLabel${index}`);
                modal.setAttribute('aria-hidden', 'true');
                modal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="projectModalLabel${index}">${project.title} - Détails</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>${project.details}</p>
                                <img src="/projects/images/${project.detailImage}" class="img-fluid" alt="Détails du ${project.title}">
                                <a href="/projects/pdf/${project.pdf}" class="btn btn-secondary mt-3" target="_blank">Voir le PDF du projet</a>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Ajouter le modal au body
                document.body.appendChild(modal);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des projets:', error);
        });
});
