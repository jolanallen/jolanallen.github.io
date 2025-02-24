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
                <div class="modal-dialog" style="max-width: 95vw; max-height: 80vh;">
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
                                    
                                    if (window.innerWidth <= 399) {
                                        const viewport = page.getViewport({ scale: 0.4 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);
                                    } else if (window.innerWidth >= 400 & window.innerWidth < 550) {
                                        const viewport = page.getViewport({ scale: 0.58 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);
                                        
                                    
                                    } else if (window.innerWidth >= 550 & window.innerWidth < 665){
                                        const viewport = page.getViewport({ scale: 0.8 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);

                                    } else if (window.innerWidth >= 665 && window.innerWidth < 750) {
                                        const viewport = page.getViewport({ scale: 1.0 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);
                                    } else if (window.innerWidth >= 750 && window.innerWidth < 850) {
                                        const viewport = page.getViewport({ scale: 1.1 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);
                                    } else if (window.innerWidth >= 850 && window.innerWidth < 1100) {
                                        const viewport = page.getViewport({ scale: 1.3 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);
                                    } else  {
                                        const viewport = page.getViewport({ scale: 1.6 });
                                        canvas.width = viewport.width;
                                        canvas.height = viewport.height;
                                        const renderContext = {
                                            canvasContext: context,
                                            viewport: viewport,
                                        };
                                        page.render(renderContext);
                                        pdfContainer.appendChild(canvas);
                                    } 
                                    
                                     
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





document.addEventListener('DOMContentLoaded', function () {
    const terminalOutput = document.getElementById('output');

    // Liste des lignes à afficher dans le terminal
    const lines = [
        { input: 'Wohami@kali:~$ echo "Mes certifications et diplomes"', output: 'Mes certifications et diplomes' },
        { input: 'Wohami@kali:~$ ls', output: 'Projets  Contact  À propos' },
        { input: 'Wohami@kali:~$ cat projet.txt', output: 'Mon projet actuel est une application web de cybersécurité.' },
        { input: 'Wohami@kali:~$ date', output: '2025-02-04 14:35:47' },
        { input: 'Wohami@kali:~$ exit', output: 'Déconnexion...' }
    ];

    let currentLine = 0;

    function typeLine(line, index) {
        let charIndex = 0;
        const typingSpeed = 50; // Vitesse de frappe en ms

        // Affichage de la ligne de commande
        const inputLine = document.createElement('div');
        inputLine.classList.add('input-line');
        terminalOutput.appendChild(inputLine);
        inputLine.innerHTML = line.input;

       

        function typeOutput() {
            const outputLine = document.createElement('div');
            outputLine.classList.add('output-line');
            terminalOutput.appendChild(outputLine);

            let outputCharIndex = 0;

            // Fonction pour afficher le texte de sortie de manière "tapée"
            function typeChar() {
                outputLine.innerHTML += line.output[outputCharIndex];
                outputCharIndex++;

                if (outputCharIndex < line.output.length) {
                    setTimeout(typeChar, typingSpeed);
                } else {
                    terminalOutput.innerHTML += '\n'; // Nouvelle ligne après chaque sortie
                    currentLine++;
                    if (currentLine < lines.length) {
                        setTimeout(typeLine, 500, lines[currentLine], currentLine); // Attendre 500ms avant de commencer la prochaine ligne
                    }
                }
            }

            typeChar();
        }

        typeOutput();
    }

    // Lancer le processus d'affichage des lignes dans le terminal
    typeLine(lines[currentLine], currentLine);
});
