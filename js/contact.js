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
