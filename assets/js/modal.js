document.addEventListener("DOMContentLoaded", () => {
    // Modale pour afficher les PDF
    const modal1 = document.getElementById('modal');
    const pdfViewer = document.getElementById('pdfViewer');
    const closeModalPdf = document.getElementById('closeModal');
    const certs = [
        { elementId: 'cert1', pdfUrl: 'assets/images/Certifications/Certification_ANSSI_MOOC_CYBER_Clément_Gontier.pdf' },
        { elementId: 'cert2', pdfUrl: 'assets/images/Certifications/attestation_CNIL.pdf' },
        { elementId: 'cert3', pdfUrl: 'assets/images/OpenClassroomsCours.png' },
        { elementId: 'cert4', pdfUrl: 'assets/images/BadgeCyber.png' },
        { elementId: 'cert5', pdfUrl: 'assets/images/Certifications/attestation-pix-20250114.pdf' }
    ];

    // Ajouter des gestionnaires pour chaque certificat
    certs.forEach(cert => {
        const element = document.getElementById(cert.elementId);
        if (element) {
            element.addEventListener('click', () => {
                pdfViewer.src = cert.pdfUrl;
                modal1.style.display = 'flex';
            });
        }
    });

    // Fermer la modale PDF
    if (closeModalPdf) {
        closeModalPdf.addEventListener('click', () => {
            modal1.style.display = 'none';
            pdfViewer.src = ''; // Réinitialise la source du PDF
        });
    }

    // Fermer en cliquant en dehors de la modale
    if (modal1) {
        window.addEventListener('click', (event) => {
            if (event.target === modal1) {
                modal1.style.display = 'none';
                pdfViewer.src = '';
            }
        });
    }

    // Modale générique
    const openModalBtn = document.querySelector('.open-modal-btn');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const genericModal = document.getElementById('myModal');

    if (openModalBtn && genericModal) {
        openModalBtn.addEventListener('click', () => {
            genericModal.style.display = 'flex';
        });
    }

    if (closeModalBtn && genericModal) {
        closeModalBtn.addEventListener('click', () => {
            genericModal.style.display = 'none';
        });
    }

    if (genericModal) {
        window.addEventListener('click', (event) => {
            if (event.target === genericModal) {
                genericModal.style.display = 'none';
            }
        });
    }

    // Modale avec carrousel
    const carouselModal = document.getElementById("carouselModal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.querySelector("#carouselModal .close");
    const nextButton = document.querySelector("#carouselModal .next");
    const prevButton = document.querySelector("#carouselModal .prev");
    const carouselItems = document.querySelectorAll("#carouselModal .carousel-item");

    let currentIndex = 0; // Index de l'image actuelle

    // Fonction pour afficher une slide spécifique
    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });
    }

    // Ouvrir la modale
    if (openModal && carouselModal) {
        openModal.addEventListener("click", () => {
            carouselModal.style.display = "block";
            showSlide(currentIndex);
        });
    }

    // Fermer la modale
    if (closeModal && carouselModal) {
        closeModal.addEventListener("click", () => {
            carouselModal.style.display = "none";
        });
    }

    // Passer à l'image suivante
    if (nextButton && carouselItems.length > 0) {
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        });
    }

    // Revenir à l'image précédente
    if (prevButton && carouselItems.length > 0) {
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentIndex);
        });
    }

    // Fermer la modale en cliquant à l'extérieur
    if (carouselModal) {
        window.addEventListener("click", (event) => {
            if (event.target === carouselModal) {
                carouselModal.style.display = "none";
            }
        });
    }
});
