document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projectsContainer'); 

    fetch('/contenu/data/certif.json') 
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
                                <img src="${project.certificats}" alt="${project.title}" class="img-fluid">
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




document.addEventListener('DOMContentLoaded', function () {
    const terminalOutput = document.getElementById('output');

    // Liste des lignes à afficher dans le terminal
    const lines = [
        { input: '┌──(wohami㉿kali)-[~]\n└─$ echo "Mes certifications et diplomes"', output: 'Mes certifications et diplomes' },
        { input: '┌──(wohami㉿kali)-[~]\n└─$ ls', output: 'Projets  Contact  À propos' },
        { input: '┌──(wohami㉿kali)-[~]\n└─$ cat projet.txt', output: 'Mon projet actuel est une application web de cybersécurité.' },
        { input: '┌──(wohami㉿kali)-[~]\n└─$ date', output: '2025-02-04 14:35:47' },
        { input: '┌──(wohami㉿kali)-[~]\n└─$ exit', output: 'Déconnexion...' }
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
