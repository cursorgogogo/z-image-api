// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('navbar-scrolled');
    } else {
        nav.classList.remove('navbar-scrolled');
    }
    
    lastScroll = currentScroll;
});

// Copy code to clipboard
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const codeBlock = this.parentElement.querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.classList.add('copied');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});

// Pricing toggle
const pricingToggle = document.getElementById('pricingToggle');
const selfHostedPricing = document.getElementById('selfHostedPricing');
const apiPricing = document.getElementById('apiPricing');

if (pricingToggle) {
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

// Waitlist form submission with Formspree support
const waitlistForm = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        submitBtn.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
        
        // Get form data
        const formData = new FormData(this);
        
        try {
            // Submit to Formspree (or your custom endpoint)
            const formAction = this.getAttribute('action');
            
            if (formAction && formAction.includes('formspree.io')) {
                // Using Formspree
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    this.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    
                    // Store in localStorage for analytics (optional)
                    const data = Object.fromEntries(formData);
                    localStorage.setItem('waitlist_joined', 'true');
                    console.log('Waitlist submission successful:', data.email);
                } else {
                    throw new Error('Form submission failed');
                }
            } else {
                // Fallback: Store locally and show message
                // This is useful for testing without Formspree setup
                const data = Object.fromEntries(formData);
                console.log('Waitlist data (stored locally):', data);
                localStorage.setItem('waitlist_data', JSON.stringify(data));
                
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                this.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Alert user that they need to set up Formspree
                console.warn('⚠️ Form submitted locally only. Set up Formspree to receive emails.');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again or contact us directly.');
            
            // Reset button state
            submitBtn.disabled = false;
            if (btnText) btnText.classList.remove('hidden');
            if (btnLoading) btnLoading.classList.add('hidden');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add fade-in animation on scroll
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

// Apply to sections (optional enhancement) - but skip waitlist form section
document.querySelectorAll('section').forEach(section => {
    // Skip the waitlist section to prevent input issues
    if (!section.id || section.id !== 'waitlist') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    } else {
        // Ensure waitlist section is always visible and interactive
        section.style.opacity = '1';
        section.style.transform = 'none';
        section.style.pointerEvents = 'auto';
    }
});

// Ensure all form inputs are interactive (extra safeguard)
document.addEventListener('DOMContentLoaded', function() {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
        // Make entire section interactive first
        waitlistSection.style.pointerEvents = 'auto';
        waitlistSection.style.opacity = '1';
        waitlistSection.style.transform = 'none';
        
        // Force all inputs, selects, and buttons in waitlist section to be interactive
        const formElements = waitlistSection.querySelectorAll('input, select, button, textarea');
        formElements.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.opacity = '1';
            element.style.userSelect = 'auto';
            element.style.zIndex = '1001';
            element.removeAttribute('disabled');
            element.removeAttribute('readonly');
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.style.cursor = 'text';
                element.style.backgroundColor = 'white';
            } else if (element.tagName === 'SELECT') {
                element.style.cursor = 'pointer';
                element.style.backgroundColor = 'white';
            } else if (element.tagName === 'BUTTON') {
                element.style.cursor = 'pointer';
            }
        });
        
        console.log('✅ Waitlist form initialized:', formElements.length, 'interactive elements');
        
        // Test focus capability
        const firstInput = waitlistSection.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => {
                try {
                    firstInput.focus();
                    console.log('✅ Form input can receive focus');
                } catch (e) {
                    console.error('❌ Form input focus failed:', e);
                }
            }, 100);
        }
    }
});

