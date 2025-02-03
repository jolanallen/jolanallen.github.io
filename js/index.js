document.addEventListener('DOMContentLoaded', () => {
    const boutonCV = document.getElementById('boutonCV');
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
