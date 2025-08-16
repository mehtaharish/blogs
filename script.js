// Blog JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add reading progress bar for blog posts
    if (document.querySelector('.post-content')) {
        createProgressBar();
    }

    // Enhanced post card interactions
    enhancePostCards();
    
    // Add copy link functionality
    addCopyLinkFeature();
    
    // Initialize search if on homepage
    if (document.querySelector('.blog-posts')) {
        initializeSearch();
    }
});

// Create reading progress bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Enhance post card interactions
function enhancePostCards() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        // Add click to navigate functionality
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('h3 a') || this.querySelector('.read-more');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {