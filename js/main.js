// ============================================
// TECHVAULTZONE - MAIN JAVASCRIPT
// COMPLETE VERSION WITH SECRET ADMIN
// ============================================

// Your Information
const SITE_INFO = {
    email: 'techvault993@gmail.com',
    website: 'https://techvaultzone.netlify.app',
    amazonId: 'techvaultzone-20',
    social: {
        youtube: 'https://www.youtube.com/@TechVautZone',
        instagram: 'https://www.instagram.com/techv_ault/?hl=en',
        facebook: 'https://www.facebook.com/profile.php?id=61585092247422',
        pinterest: 'https://www.pinterest.com/techvaultzone',
        tiktok: 'https://www.tiktok.com/@techvaultzone'
    }
};

// Default categories
const defaultCategories = [
    { name: 'Smartphones', slug: 'smartphones', icon: 'fa-mobile-alt', description: 'Latest mobile phones and accessories' },
    { name: 'Laptops', slug: 'laptops', icon: 'fa-laptop', description: 'Powerful laptops for work and play' },
    { name: 'Headphones', slug: 'headphones', icon: 'fa-headphones', description: 'Wireless earbuds and headphones' },
    { name: 'Cameras', slug: 'cameras', icon: 'fa-camera', description: 'DSLR, mirrorless and action cameras' },
    { name: 'Smart Home', slug: 'smart-home', icon: 'fa-home', description: 'Smart speakers, lights and more' },
    { name: 'Gaming', slug: 'gaming', icon: 'fa-gamepad', description: 'Consoles, controllers and gaming gear' }
];

// ============================================
// SECRET ADMIN ACCESS - TRIPLE CLICK
// ============================================

let themeClickCount = 0;
let clickTimer;

function handleThemeClick(e) {
    // Normal theme toggle functionality
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = newTheme === 'light' ? 
            '<i class="fas fa-moon"></i><span class="secret-dot"></span>' : 
            '<i class="fas fa-sun"></i><span class="secret-dot"></span>';
    }
    
    // SECRET ADMIN DETECTION - TRIPLE CLICK
    themeClickCount++;
    
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        if (themeClickCount >= 3) {
            // Triple click detected - go to admin login
            window.location.href = 'admin/login.html';
        } else if (themeClickCount === 2) {
            // Double click - show secret message
            showSecretMessage();
        }
        themeClickCount = 0;
    }, 500);
}

function showSecretMessage() {
    // Remove any existing message
    const oldMessage = document.querySelector('.secret-message');
    if (oldMessage) oldMessage.remove();
    
    // Create new message
    const message = document.createElement('div');
    message.className = 'secret-message';
    message.textContent = '🔵 One more click for admin...';
    document.body.appendChild(message);
    
    // Remove after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// ============================================
// REGULAR FUNCTIONS
// ============================================

// Load categories
function loadCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    
    grid.innerHTML = defaultCategories.map(cat => `
        <a href="category.html?slug=${cat.slug}" class="category-card">
            <div class="category-icon">
                <i class="fas ${cat.icon}"></i>
            </div>
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
        </a>
    `).join('');
}

// Theme toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light' ? 
        '<i class="fas fa-moon"></i><span class="secret-dot"></span>' : 
        '<i class="fas fa-sun"></i><span class="secret-dot"></span>';
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Active nav link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Newsletter form
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        form.reset();
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        form.reset();
    });
}

// Update stats
function updateStats() {
    const productCount = document.getElementById('productCount');
    const categoryCount = document.getElementById('categoryCount');
    
    if (productCount) productCount.textContent = '0';
    if (categoryCount) categoryCount.textContent = defaultCategories.length;
}

// Amazon link generator
function getAmazonLink(productId) {
    return `https://www.amazon.com/dp/${productId}/?tag=${SITE_INFO.amazonId}`;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechVaultZone initialized - Secret Admin: Triple-click theme button');
    console.log('Amazon Store ID:', SITE_INFO.amazonId);
    
    setActiveNav();
    initTheme();
    initMobileMenu();
    initNewsletter();
    initContactForm();
    updateStats();
    
    if (document.getElementById('categoryGrid')) {
        loadCategories();
    }
});
