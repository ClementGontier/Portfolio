// Créez un fichier widescreen.js dans le dossier assets/js/
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour ajuster les éléments sur les grands écrans
    function adjustForWideScreens() {
        const windowWidth = window.innerWidth;
        
        // Ajuster la hauteur des sections sur les très grands écrans
        if (windowWidth >= 1920) {
            // Ajuster la hauteur de la section d'accueil
            const welcomeHero = document.getElementById('welcome-hero');
            if (welcomeHero) {

                welcomeHero.style.display = 'flex';
                welcomeHero.style.alignItems = 'center';
            }
            
            // Ajuster les modales pour les grands écrans
            const modalContainers = document.querySelectorAll('.cert-modal-container, .project-modal-container');
            modalContainers.forEach(container => {
                container.style.maxWidth = '1600px';
            });
        }
        
        // Ajuster les images de projet pour qu'elles ne soient pas trop grandes
        const projectSlideImages = document.querySelectorAll('.project-slide img');
        projectSlideImages.forEach(img => {
            if (windowWidth >= 1600) {
                img.style.maxHeight = '70vh';
            }
        });
    }
    
    // Exécuter au chargement et au redimensionnement
    adjustForWideScreens();
    window.addEventListener('resize', adjustForWideScreens);
});
