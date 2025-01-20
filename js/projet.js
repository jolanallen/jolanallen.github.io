document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.querySelector('.container.mt-5 .row');

    // Chargement de  la bibliothèque PDF.js
    const pdfJsLibUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    const script = document.createElement('script');
    script.src = pdfJsLibUrl;
    document.head.appendChild(script);

    script.onload = () => {
        let modal = document.getElementById('genericModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.id = 'genericModal';
            modal.tabIndex = -1;
            modal.setAttribute('aria-labelledby', 'genericModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="modal-dialog" style="max-width: 50vw; max-height: 80vh;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="genericModalLabel"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="pdfContainer">
                            <!-- Les pages PDF seront affichées ici -->
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        fetch('/contenu/data/project.json')
            .then(response => response.json())
            .then(projects => {
                projects.forEach(project => {

                    const projectCard = document.createElement('div');
                    projectCard.classList.add('col-md-4', 'mb-4');
                    projectCard.innerHTML = `
                       <div class="card">
                        <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${project.year}</h6>
                            <p class="card-text">${project.description}</p>
                            <button type="button" class="btn btn-primary open-modal" data-project-title="${project.title}" data-pdf-link="${project.pdfLink}">
                                Voir les détails
                            </button>
                            <a href="${project.pdfLink}" class="btn btn-secondary mt-3" target="_blank">
                                Télécharger le livrable PDF
                            </a>
                        </div>
                    </div>
                    `;
                    projectContainer.appendChild(projectCard);
                });

                document.querySelectorAll('.open-modal').forEach(button => {
                    button.addEventListener('click', event => {
                        const button = event.currentTarget;
                        const projectTitle = button.getAttribute('data-project-title');
                        const pdfLink = button.getAttribute('data-pdf-link');

                    
                        const modalTitle = document.getElementById('genericModalLabel');
                        const pdfContainer = document.getElementById('pdfContainer');
                        modalTitle.textContent = projectTitle;
                        pdfContainer.innerHTML = '';

                    
                        pdfjsLib.getDocument(pdfLink).promise.then(pdf => {
                            const renderPage = (pageNumber) => {
                                pdf.getPage(pageNumber).then(page => {
                                    const canvas = document.createElement('canvas');
                                    const context = canvas.getContext('2d');

                                    const viewport = page.getViewport({ scale: 1.0 });
                                    canvas.width = viewport.width;
                                    canvas.height = viewport.height;

                                    pdfContainer.appendChild(canvas); // Ajouter le canvas pour chaque page

                                    const renderContext = {
                                        canvasContext: context,
                                        viewport: viewport
                                    };
                                    page.render(renderContext);
                                });
                            };

                            // Parcourir toutes les pages du PDF
                            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                                renderPage(pageNumber);
                            }
                        }).catch(error => {
                            console.error('Erreur lors du chargement du PDF:', error);
                        });
                        const bootstrapModal = new bootstrap.Modal(document.getElementById('genericModal'));
                        bootstrapModal.show();
                    });
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement du fichier JSON:', error);
            });
    };

    script.onerror = () => {
        console.error('Erreur lors du chargement de PDF.js');
    };
});
