/**
 * Main JavaScript file for Personal Blog.
 * Handles theme toggling, sticky navigation effects, and general page transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStickyHeader();
    initActiveNavLinks();
});

/**
 * Theme Toggling System
 */
function initTheme() {
    const themeBtn = document.querySelector('.theme-btn');
    if (!themeBtn) return;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle click event
    themeBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add click animation scale effect to button
        themeBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeBtn.style.transform = 'none';
        }, 150);
    });
}

/**
 * Sticky Header Scroll Effect
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('sticky-scrolled');
        } else {
            header.classList.remove('sticky-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
}

/**
 * Highlight Current Active Page in Nav
 */
function initActiveNavLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Match paths
        if (currentPath.endsWith(linkPath) || 
            (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
