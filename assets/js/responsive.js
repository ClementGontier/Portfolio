document.addEventListener('DOMContentLoaded', function() {
    // Fermer automatiquement le menu mobile après un clic sur un lien
    const navLinks = document.querySelectorAll('.navbar-collapse a.smooth-menu');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggle = document.querySelector('.navbar-toggle');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                // Simuler un clic sur le bouton de toggle pour fermer le menu
                navbarToggle.click();
            }
        });
    });
    
    // Ajuster la hauteur des modales sur mobile
    function adjustModalHeight() {
        const viewportHeight = window.innerHeight;
        const certModalContainer = document.querySelector('.cert-modal-container');
        const projectModalContainer = document.querySelector('.project-modal-container');
        
        if (certModalContainer) {
            if (window.innerWidth < 768) {
                certModalContainer.style.height = (viewportHeight * 0.9) + 'px';
            } else {
                certModalContainer.style.height = '85%';
            }
        }
        
        if (projectModalContainer) {
            if (window.innerWidth < 768) {
                projectModalContainer.style.height = (viewportHeight * 0.9) + 'px';
            } else {
                projectModalContainer.style.height = '85%';
            }
        }
    }
    
    // Ajuster la hauteur au chargement et au redimensionnement
    adjustModalHeight();
    window.addEventListener('resize', adjustModalHeight);
    
    // Améliorer le défilement sur mobile pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset pour tenir compte de la navbar fixe
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
