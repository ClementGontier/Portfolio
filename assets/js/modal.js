document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const modalOverlay = document.getElementById('certModalOverlay');
    const pdfViewer = document.getElementById('pdfViewer');
    const closeModalBtn = document.getElementById('certCloseModal');
    const certThumbnails = document.querySelectorAll('.cert-thumbnail');
    
    // Function to open modal
    function openModal(pdfSrc) {
        pdfViewer.setAttribute('src', pdfSrc);
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal() {
        modalOverlay.style.display = 'none';
        pdfViewer.setAttribute('src', '');
        document.body.style.overflow = 'auto';
    }
    
    // Add click event to each thumbnail
    certThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfSrc = this.getAttribute('data-pdf-src');
            openModal(pdfSrc);
        });
    });
    
    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const modalOverlay = document.getElementById('projectModalOverlay');
    const closeModalBtn = document.getElementById('projectCloseModal');
    const projectThumbnails = document.querySelectorAll('.project-thumbnail');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    // Carousel variables
    let currentSlide = 0;
    let activeProject = null;
    
    // Open modal function
    function openProjectModal(projectId) {
        // Hide all project carousels
        document.querySelectorAll('.project-carousel-container').forEach(container => {
            container.style.display = 'none';
        });
        
        // Show the selected project carousel
        const projectCarousel = document.getElementById(`${projectId}-project`);
        if (projectCarousel) {
            projectCarousel.style.display = 'block';
            activeProject = projectId;
            
            // Reset to first slide
            currentSlide = 0;
            updateCarousel();
            
            // Show modal
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close modal function
    function closeProjectModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        activeProject = null;
    }
    
    // Update carousel function
    function updateCarousel() {
        if (!activeProject) return;
        
        const projectCarousel = document.getElementById(`${activeProject}-project`);
        const slides = projectCarousel.querySelectorAll('.project-slide');
        const dots = projectCarousel.querySelectorAll('.project-dot');
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        if (!activeProject) return;
        
        const projectCarousel = document.getElementById(`${activeProject}-project`);
        const slides = projectCarousel.querySelectorAll('.project-slide');
        
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        
        updateCarousel();
    }
    
    // Previous slide function
    function prevSlide() {
        if (!activeProject) return;
        
        const projectCarousel = document.getElementById(`${activeProject}-project`);
        const slides = projectCarousel.querySelectorAll('.project-slide');
        
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        
        updateCarousel();
    }
    
    // Event listeners for thumbnails
    projectThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Event listeners for view project buttons
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeProjectModal();
        }
    });
    
    // Add event listeners for carousel navigation
    document.querySelectorAll('.project-next-btn').forEach(btn => {
        btn.addEventListener('click', nextSlide);
    });
    
    document.querySelectorAll('.project-prev-btn').forEach(btn => {
        btn.addEventListener('click', prevSlide);
    });
    
    // Add event listeners for dots
    document.querySelectorAll('.project-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            if (!activeProject) return;
            
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateCarousel();
        });
    });
    
    // // Auto-advance carousel (optional)
    // setInterval(function() {
    //     if (activeProject && modalOverlay.style.display === 'flex') {
    //         nextSlide();
    //     }
    // }, 5000); // Change slide every 5 seconds
});