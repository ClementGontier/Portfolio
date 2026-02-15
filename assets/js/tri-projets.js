document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Affiche ou masque les projets en fonction de la catégorie (utilise une classe pour un reflux correct)
            projectItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.parentElement.classList.remove("project-hidden"); // Affiche le projet
                } else {
                    item.parentElement.classList.add("project-hidden"); // Masque le projet
                }
            });

            // Met à jour l'état actif des boutons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
});