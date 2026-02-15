 // Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Testimonial Slider
$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        nav:true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1170:{
                items:3,
            }
        }
    });
});

    // Language switcher
    const langButton = document.getElementById('switchLang');
    const savedLang = localStorage.getItem('lang') || 'fr';

    // Normalize text by removing extra spaces and newlines
    function normalizeText(text) {
        return text.replace(/\s+/g, ' ').trim();
    }

    function applyLanguage(lang) {
        // Update document title
        if (lang === 'en') {
            document.title = 'Clément Gontier - Portfolio';
        } else {
            document.title = 'Portfolio Clément Gontier';
        }

        // Special handling for bullet points in card-text elements
        const cardTexts = document.querySelectorAll('.card-text');
        cardTexts.forEach(element => {
            let html = element.innerHTML;
            // Normalize whitespace in HTML (preserve <br> tags)
            html = html.replace(/\s+/g, ' ').replace(/ <br>/g, '<br>').replace(/<br> /g, '<br>');
            
            if (lang === 'en') {
                // French to English translation
                for (let frKey in translations) {
                    const enValue = translations[frKey]['en'];
                    // Handle both with and without line breaks
                    const frKeyNormalized = frKey.replace(/\s+/g, ' ').trim();
                    const regex = new RegExp(frKeyNormalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    html = html.replace(regex, enValue);
                }
            } else {
                // English to French translation
                for (let frKey in translations) {
                    const enValue = translations[frKey]['en'];
                    const enValueNormalized = enValue.replace(/\s+/g, ' ').trim();
                    const regex = new RegExp(enValueNormalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    html = html.replace(regex, frKey);
                }
            }
            element.innerHTML = html;
        });

        // Traverse all text nodes and translate them (for non-bullet content)
        const walkDom = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (text && text.trim()) {
                    const normalized = normalizeText(text);
                    
                    if (lang === 'en') {
                        // Try to find in translations (French to English)
                        if (translations[normalized]) {
                            node.textContent = translations[normalized]['en'];
                        } else {
                            // Try to find with original spaces
                            if (translations[text]) {
                                node.textContent = translations[text]['en'];
                            }
                        }
                    } else {
                        // Reverse translation (English to French)
                        let found = false;
                        for (let frKey in translations) {
                            if (translations[frKey]['en'] === text) {
                                node.textContent = frKey;
                                found = true;
                                break;
                            }
                            // Also try with normalized text
                            if (normalizeText(translations[frKey]['en']) === normalized) {
                                node.textContent = frKey;
                                found = true;
                                break;
                            }
                        }
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Skip script, style and card-text tags (already handled)
                if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && !node.classList.contains('card-text')) {
                    // Process all child nodes
                    for (let i = 0; i < node.childNodes.length; i++) {
                        walkDom(node.childNodes[i]);
                    }
                }
            }
        };

        walkDom(document.body);

        // Update language button
        if (langButton) langButton.textContent = lang === 'fr' ? 'EN' : 'FR';
        localStorage.setItem('lang', lang);
    }

    // Initialize language on load
    applyLanguage(savedLang);

    if (langButton) {
        langButton.addEventListener('click', () => {
            const current = localStorage.getItem('lang') || 'fr';
            const next = current === 'fr' ? 'en' : 'fr';
            applyLanguage(next);
        });
    }
