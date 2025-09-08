// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navToggle.classList.contains('active') ? 'true' : 'false');
            
            // Animate toggle lines
            const lines = navToggle.querySelectorAll('.nav-toggle-line');
            // handled by CSS class .nav-toggle.active
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // lines reset handled by CSS when class removed
            });
        });
    }
});

// Email form handling for Formspree with AJAX and Modal
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('email-form');
    
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Always prevent default for AJAX submission
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitButton = this.querySelector('button[type="submit"]');
            const formAction = this.action;
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Joining...';
            submitButton.disabled = true;
            
            // Check if we're on localhost (development)
            const isLocalhost = window.location.hostname === 'localhost' || 
                               window.location.hostname === '127.0.0.1' || 
                               window.location.hostname === '0.0.0.0';
            
            if (isLocalhost) {
                // Simulate success for local testing
                setTimeout(() => {
                    emailInput.value = '';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    showThankYouModal();
                }, 1000);
                return;
            }
            
            // Production: Submit to Formspree via AJAX
            try {
                const formData = new FormData(this);
                
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success!
                    emailInput.value = '';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Track conversion in Google Analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'email_signup', {
                            'event_category': 'engagement',
                            'event_label': 'formspree_modal_signup',
                            'value': 1
                        });
                    }
                    
                    // Show beautiful modal
                    showThankYouModal();
                    
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showNotification('Something went wrong. Please try again or contact us directly.', 'error');
            }
        });
    }
});

// Modal functionality
function showThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus management for accessibility
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
}

function closeThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Return focus to form
        const emailForm = document.getElementById('email-form');
        if (emailForm) {
            const emailInput = emailForm.querySelector('input[type="email"]');
            if (emailInput) emailInput.focus();
        }
    }
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('thank-you-modal');
    
    if (modal) {
        // Close on X button
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeThankYouModal);
        }
        
        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeThankYouModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeThankYouModal();
            }
        });
    }
});

// CTA button scroll to contact
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, [href="#contact"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 100; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-inview');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const animatedElements = document.querySelectorAll('.book-card, .author-card, .mission-content, .contact-benefits');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header background on scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }
});

// Amazon outbound tracking via delegated listener (CSP-safe)
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[data-track="amazon"]');
        if (link) {
            if (typeof trackAmazonClick === 'function') {
                try { trackAmazonClick(); } catch (err) { /* noop */ }
            }
        }
    });
});

// Track external links (for future Amazon links)
function trackAmazonClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'amazon_click', {
            'event_category': 'outbound',
            'event_label': 'amazon_book_link',
            'value': 1
        });
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    notification.classList.add(type === 'success' ? 'notification-success' : 'notification-error');
    // Add to page
    document.body.appendChild(notification);
    // Close handler (CSP-safe)
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const parent = notification;
            if (parent && parent.parentNode) parent.parentNode.removeChild(parent);
        });
    }
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.add('is-visible');
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('is-visible');
            setTimeout(() => { if (notification.parentNode) notification.remove(); }, 300);
        }
    }, 5000);
}

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});