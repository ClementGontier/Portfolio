document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use default (light)
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateIcon(true);
    }
    
    // Add click event to the toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            // Toggle dark mode class on body
            document.body.classList.toggle('dark-mode');
            
            // Determine the current theme
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Update the icon
            updateIcon(isDarkMode);
            
            // Save the preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
    
    // Function to update the icon based on the current theme
    function updateIcon(isDarkMode) {
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            if (isDarkMode) {
                icon.classList.remove('fa-moon-o');
                icon.classList.add('fa-sun-o');
            } else {
                icon.classList.remove('fa-sun-o');
                icon.classList.add('fa-moon-o');
            }
        }
    }
});
