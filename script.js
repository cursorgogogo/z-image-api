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

// Waitlist form submission
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
        const data = Object.fromEntries(formData);
        
        // Simulate API call (replace with actual endpoint)
        try {
            // TODO: Replace with actual API endpoint
            // await fetch('/api/waitlist', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Optional: Send to console for debugging
            console.log('Waitlist submission:', data);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
            
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

// Apply to sections (optional enhancement)
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

