document.addEventListener('DOMContentLoaded', () => {
    const boutonCV = document.getElementById('boutonCV');
    const boutoncertif1 = document.getElementById('certif1')
    const pdfContainer = document.getElementById('pdfContainer'); 

    const pdfJsLibUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    const script = document.createElement('script');
    script.src = pdfJsLibUrl;
    document.head.appendChild(script);

    script.onload = () => {
        boutonCV.addEventListener('click', () => {
            const pdfUrl = "contenu/document/CV-ALLEN-JOLAN.pdf";  
            pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
                pdfContainer.innerHTML = ''; 
                pdf.getPage(1).then(page => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const viewport = page.getViewport({ scale: 1.0 });
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    page.render(renderContext);
                    pdfContainer.appendChild(canvas); 
                });
            }).catch(error => {
                console.error('Erreur lors du chargement du PDF :', error);
            });
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
        { input: '┌──(wohami㉿kali)-[~]\n└─$ ./Présentations.sh"', output: 'balabal\nje sui\nbakbzdjk balabal\nje sui\nbakbzdjk balabal\nje sui\nbakbzdjk ' },

    ];

    let currentLine = 0;

    function typeLine(line, index) {
        let charIndex = 0;
        const typingSpeed = 50; // Vitesse de frappe en ms


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


