// ===================================
// Mobile Navigation Toggle
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal anchors
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and major elements
const animatedElements = document.querySelectorAll(`
    .char-card,
    .context-card,
    .concept-card,
    .technique-card,
    .app-card,
    .challenge-card,
    .practice-card,
    .resource-item,
    .definition-card
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Scroll to Top Button (Optional Enhancement)
// ===================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    font-size: 1.2rem;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
});

// ===================================
// Loading Animation for Images (if any)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// ===================================
// Technique Card Expand/Collapse (Optional Enhancement)
// ===================================

const techniqueCards = document.querySelectorAll('.technique-card');

techniqueCards.forEach(card => {
    const details = card.querySelector('.technique-details');
    if (details) {
        // Initially collapse details on mobile
        if (window.innerWidth < 768) {
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s ease';
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', () => {
                if (details.style.maxHeight === '0px' || details.style.maxHeight === '') {
                    details.style.maxHeight = details.scrollHeight + 'px';
                } else {
                    details.style.maxHeight = '0';
                }
            });
        }
    }
});

// ===================================
// Parallax Effect for Hero Section (Disabled to prevent overlap)
// ===================================

// Parallax effect disabled to prevent text overlap issues
// const hero = document.querySelector('.hero');
//
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallax = scrolled * 0.5;
//     
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translateY(${parallax}px)`;
//     }
// });

// ===================================
// Copy Code Functionality (if code blocks exist)
// ===================================

const codeBlocks = document.querySelectorAll('pre code');

codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.textContent = 'Copy';
    button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.25rem 0.75rem;
        background: rgba(79, 70, 229, 0.8);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.3s ease;
    `;
    
    const pre = block.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(block.textContent);
            button.textContent = 'Copied!';
            button.style.background = 'rgba(16, 185, 129, 0.8)';
            
            setTimeout(() => {
                button.textContent = 'Copy';
                button.style.background = 'rgba(79, 70, 229, 0.8)';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// ===================================
// Search Functionality (Basic)
// ===================================

function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 600px;
        background: var(--bg-dark);
        border: 2px solid var(--primary-color);
        border-radius: 12px;
        padding: 2rem;
        z-index: 10000;
        display: none;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;
    
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search..." class="search-input" style="
            width: 100%;
            padding: 1rem;
            background: var(--bg-darker);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 1.1rem;
            outline: none;
        ">
        <div class="search-results" style="
            margin-top: 1rem;
            max-height: 300px;
            overflow-y: auto;
        "></div>
    `;
    
    document.body.appendChild(searchContainer);
    
    // Toggle search with Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const isVisible = searchContainer.style.display === 'block';
            searchContainer.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                searchContainer.querySelector('.search-input').focus();
            }
        }
        
        if (e.key === 'Escape') {
            searchContainer.style.display = 'none';
        }
    });
    
    // Close on outside click
    searchContainer.addEventListener('click', (e) => {
        if (e.target === searchContainer) {
            searchContainer.style.display = 'none';
        }
    });
}

// Uncomment to enable search functionality
// createSearchBox();

// ===================================
// Print/Export Functionality
// ===================================

// Add print styles dynamically
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar,
        .hamburger,
        .scroll-top-btn,
        .hero-buttons,
        .scroll-indicator {
            display: none !important;
        }
        
        body {
            background: white;
            color: black;
        }
        
        .section {
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(printStyles);

// ===================================
// Performance Optimization
// ===================================

// Debounce scroll events for better performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    // Your scroll handlers here
}, 10));

// ===================================
// Accessibility Enhancements
// ===================================

// Add keyboard navigation for cards
document.querySelectorAll('.char-card, .technique-card, .app-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#overview';
skipLink.textContent = 'Skip to content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10001;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// Theme Toggle (Optional - Future Enhancement)
// ===================================

// Uncomment to enable light/dark theme toggle
/*
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 2px solid var(--border-color);
        color: var(--text-primary);
        cursor: pointer;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = toggle.querySelector('i');
        icon.className = document.body.classList.contains('light-theme') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    });
}

// createThemeToggle();
*/

// ===================================
// Console Welcome Message
// ===================================

console.log(
    '%c🔍 Explainable AI Tutorial',
    'font-size: 24px; font-weight: bold; color: #667eea;'
);
console.log(
    '%cWelcome! This comprehensive guide covers everything about Explainable AI.',
    'font-size: 14px; color: #94a3b8;'
);
console.log(
    '%cDesigned & Developed by Prateek Dutta',
    'font-size: 12px; font-style: italic; color: #64748b;'
);

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('XAI Tutorial Page Loaded Successfully! 🚀');
    
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

