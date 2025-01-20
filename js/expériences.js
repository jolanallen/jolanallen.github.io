document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projectsContainer'); 

    fetch('/contenu/data/experiences.json') 
        .then(response => response.json())
        .then(projects => {
          
            projects.forEach(project => {
             
                const projectCard = document.createElement('div');
                projectCard.classList.add('col-md-4', 'mb-4');
                projectCard.innerHTML = `
                    <div class="card">
                        <img src="${project.image}" alt="${project.title}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${project.year}</h6>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal${project.id}">
                                Voir les détails
                            </button>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
                const modal = document.createElement('div');
                modal.classList.add('modal', 'fade');
                modal.id = `projectModal${project.id}`;
                modal.tabIndex = -1;
                modal.setAttribute('aria-labelledby', `projectModalLabel${project.id}`);
                modal.setAttribute('aria-hidden', 'true');
                modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="projectModalLabel${project.id}">${project.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <img src="${project.image}" alt="${project.title}" class="img-fluid">
                                <h4>${project.title}</h4>
                                <p><strong>Année :</strong> ${project.year}</p>
                                <p>${project.description}</p>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal); 
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON :', error);
        });
});
