document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour fermer le menu mobile après un clic sur un lien
    function setupMobileNavbar() {
        const navLinks = document.querySelectorAll('.navbar-collapse a.smooth-menu');
        const navbarToggle = document.querySelector('.navbar-toggle');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    // Simuler un clic sur le bouton de toggle pour fermer le menu
                    if (navbarToggle && 
                        document.querySelector('.navbar-collapse.collapse.in')) {
                        navbarToggle.click();
                    }
                }
            });
        });
    }
    
    // Fonction pour ajuster la hauteur du menu mobile
    function adjustMobileNavHeight() {
        if (window.innerWidth < 992) {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse) {
                const windowHeight = window.innerHeight;
                const navbarHeight = document.querySelector('.navbar-header').offsetHeight;
                navbarCollapse.style.maxHeight = (windowHeight - navbarHeight) + 'px';
            }
        }
    }
    
    // Fonction pour ajuster la position du bouton dark mode
    function adjustDarkModeToggle() {
        const darkModeContainer = document.querySelector('.dark-mode-container');
        if (darkModeContainer) {
            if (window.innerWidth < 992) {
                // Position absolue sur mobile
                darkModeContainer.style.position = 'absolute';
                darkModeContainer.style.top = '15px';
                darkModeContainer.style.right = window.innerWidth < 480 ? '55px' : '60px';
            } else {
                // Position normale sur desktop
                darkModeContainer.style.position = 'relative';
                darkModeContainer.style.top = 'auto';
                darkModeContainer.style.right = 'auto';
            }
        }
    }
    
    // Fonction pour ajuster le logo sur mobile
    function adjustBrandLogo() {
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            if (window.innerWidth < 480) {
                navbarBrand.style.maxWidth = '65%';
            } else if (window.innerWidth < 768) {
                navbarBrand.style.maxWidth = '75%';
            } else {
                navbarBrand.style.maxWidth = 'none';
            }
        }
    }
    
    // Exécuter les fonctions au chargement
    setupMobileNavbar();
    adjustMobileNavHeight();
    adjustDarkModeToggle();
    adjustBrandLogo();
    
    // Exécuter les fonctions au redimensionnement
    window.addEventListener('resize', function() {
        adjustMobileNavHeight();
        adjustDarkModeToggle();
        adjustBrandLogo();
    });
    
    // Corriger le problème de défilement sur iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.querySelector('.navbar-collapse').style.maxHeight = '70vh';
        document.querySelector('.navbar-collapse').style.webkitOverflowScrolling = 'touch';
    }
});
