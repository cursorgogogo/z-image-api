// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScrollTop = scrollTop;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Add mobile menu styles dynamically if needed
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navLinks.style.display = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.flexDirection = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.boxShadow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            navLinks.style.display = '';
        });
    });
}

// ===================================
// Copy Code Block Functionality
// ===================================
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const codeBlock = button.nextElementSibling;
        const code = codeBlock.textContent;
        
        try {
            await navigator.clipboard.writeText(code);
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            button.textContent = 'Failed';
            
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .tutorial-step, .faq-item, .guide-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// Stats Counter Animation
// ===================================
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (typeof end === 'number') {
            element.textContent = Math.floor(progress * (end - start) + start) + suffix;
        } else {
            element.textContent = end;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Simple animation for demonstration
                stat.style.opacity = '0';
                setTimeout(() => {
                    stat.style.transition = 'opacity 0.5s ease-in';
                    stat.style.opacity = '1';
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// FAQ Accordion Functionality (Optional Enhancement)
// ===================================
document.querySelectorAll('.faq-item').forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', () => {
        // Toggle active state for visual feedback
        item.style.transform = item.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
        
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
});

// ===================================
// External Link Tracking
// ===================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track external link clicks (can integrate with analytics)
        const url = link.href;
        console.log('External link clicked:', url);
        
        // Add analytics tracking here if needed
        // Example: gtag('event', 'click', { 'event_category': 'external_link', 'event_label': url });
    });
});

// ===================================
// Search Engine Optimization Enhancements
// ===================================
// Add structured data for better search engine understanding
function addStructuredData() {
    // Check if structured data already exists
    if (document.querySelector('script[type="application/ld+json"]')) {
        return;
    }
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Z Image API - Advanced AI Image Generation",
        "description": "Fastest open-source AI image generation API with Python support",
        "url": window.location.href,
        "keywords": "Z image api python, Z image api github, Z image api tutorial",
        "inLanguage": "en",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Z Image API",
            "url": window.location.origin
        }
    };
    
    // Note: Structured data already in HTML, this is just for reference
}

// ===================================
// Performance Monitoring
// ===================================
window.addEventListener('load', () => {
    // Log page load time for performance monitoring
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
    
    // Lazy load images if needed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===================================
// Handle Browser Back/Forward Navigation
// ===================================
window.addEventListener('popstate', (event) => {
    // Handle navigation state if needed
    if (event.state) {
        console.log('Navigation state:', event.state);
    }
});

// ===================================
// Keyboard Navigation Enhancement
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        navLinks.style.display = '';
    }
});

// ===================================
// Form Validation (if forms are added later)
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// Dynamic Meta Tag Updates for SPA-like Behavior
// ===================================
function updateMetaTags(section) {
    const titles = {
        'features': 'Features - Z Image API',
        'demo': 'Live Demo - Z Image API',
        'tutorial': 'Tutorial - Z Image API',
        'python-guide': 'Python Guide - Z Image API',
        'github': 'GitHub - Z Image API'
    };
    
    if (titles[section]) {
        document.title = titles[section];
    }
}

// Listen for section changes
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateMetaTags(entry.target.id);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c👋 Welcome to Z Image API!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in contributing? Visit our GitHub: https://github.com/Tongyi-MAI/Z-Image', 'font-size: 14px; color: #10b981;');

// ===================================
// Pricing Toggle Functionality
// ===================================
const pricingToggle = document.getElementById('pricingToggle');
const selfHostedPricing = document.getElementById('selfHostedPricing');
const apiPricing = document.getElementById('apiPricing');

if (pricingToggle && selfHostedPricing && apiPricing) {
    pricingToggle.addEventListener('change', function() {
        if (this.checked) {
            selfHostedPricing.classList.add('hidden');
            apiPricing.classList.remove('hidden');
        } else {
            selfHostedPricing.classList.remove('hidden');
            apiPricing.classList.add('hidden');
        }
    });
}

// ===================================
// Waitlist Form Submission
// ===================================
const waitlistForm = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            useCase: document.getElementById('useCase').value,
            estimatedVolume: document.getElementById('estimatedVolume').value,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        };
        
        // Validate email
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitBtn.disabled = true;
        
        try {
            // TODO: Replace with your actual API endpoint
            // For now, we'll simulate an API call
            console.log('Waitlist submission:', formData);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Store in localStorage for demo purposes
            const waitlistData = JSON.parse(localStorage.getItem('waitlistData') || '[]');
            waitlistData.push(formData);
            localStorage.setItem('waitlistData', JSON.stringify(waitlistData));
            
            // TODO: Send to your backend/email service
            // Example with fetch:
            /*
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Submission failed');
            }
            */
            
            // Show success message
            waitlistForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Track conversion (integrate with analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_signup', {
                    'event_category': 'engagement',
                    'event_label': formData.useCase
                });
            }
            
            // Reset form
            waitlistForm.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Oops! Something went wrong. Please try again or contact us directly.');
        } finally {
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });
}

// ===================================
// Social Proof Counter Animation
// ===================================
function animateWaitlistCounter() {
    const socialProof = document.querySelector('.social-proof strong');
    if (socialProof) {
        const startCount = 1200;
        const endCount = 1247;
        const duration = 2000;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const currentCount = Math.floor(progress * (endCount - startCount) + startCount);
            socialProof.textContent = `${currentCount.toLocaleString()}+ developers`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        // Observe when waitlist section comes into view
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.animated) {
                        entry.target.dataset.animated = 'true';
                        window.requestAnimationFrame(step);
                    }
                });
            }, { threshold: 0.3 });
            
            counterObserver.observe(waitlistSection);
        }
    }
}

// Initialize counter animation
animateWaitlistCounter();

// ===================================
// Form Field Enhancements
// ===================================
// Add floating label effect
const formInputs = document.querySelectorAll('.waitlist-form input, .waitlist-form select');
formInputs.forEach(input => {
    // Focus effect
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Add value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ===================================
// Pricing Card Hover Effects
// ===================================
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// Use Case Cards Animation
// ===================================
const useCaseCards = document.querySelectorAll('.use-case-card');
useCaseCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// Comparison Table Scroll Hint
// ===================================
const comparisonWrapper = document.querySelector('.comparison-table-wrapper');
if (comparisonWrapper) {
    // Add scroll hint for mobile
    if (window.innerWidth < 768) {
        const scrollHint = document.createElement('div');
        scrollHint.className = 'scroll-hint';
        scrollHint.innerHTML = '← Swipe to see more →';
        comparisonWrapper.appendChild(scrollHint);
        
        // Hide hint after first scroll
        comparisonWrapper.addEventListener('scroll', function() {
            scrollHint.style.opacity = '0';
            setTimeout(() => scrollHint.remove(), 300);
        }, { once: true });
    }
}

// ===================================
// Export functions for testing (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateValue,
        validateEmail,
        updateMetaTags
    };
}

