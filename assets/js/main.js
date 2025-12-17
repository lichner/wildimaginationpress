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

// MailerLite Configuration
const MAILERLITE_CONFIG = {
    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGQ1MjRhOTg1NTdlNWU2ZWVjYmIxMDUyZDIyMDM5Y2U0ZjY2MzU1Y2YwNGMxNTkyNjg0ODcyZjU3ZTNkMzc5ZWYyZjA1YjUxZTk2YmNlYzUiLCJpYXQiOjE3NjU3MDEwOTIuMzM5NjY5LCJuYmYiOjE3NjU3MDEwOTIuMzM5NjcyLCJleHAiOjQ5MjEzNzQ2OTIuMzM2MjIsInN1YiI6IjE5OTkyMTAiLCJzY29wZXMiOltdfQ.p0KkCssym915Sb0FX5q2gFNZn5yJkkx1hIZwkpdSmdB6D8n0pxka3RrkGSLSSYdjJDVelpFgAntrLdV8oDCD6gKpM2JUnWqqIIp7CcR2hBCYFMot4ymUkbo6n7Y-EymBfMVAjDsTBBi5pZ7BQoHO3XKfUDNBOUCivDRotmbUw6h73umt872BEH25yh6wi65mXwbu4AIP1WjvEU3Cjc1OWwhp0grz5q0TiWWPaTjlnaKLKc4lsZG7H3uAeoCwh8A6CZjMP4tAOB3rnJtjKJVr4GXQACwMgEO3kX76kxx6Hye048ANkxGDVhvrzIRb1Vo1X60coTowrKpZ6fFqgsUF96iXpszbokI0gtgPZbxwHCD3j9ZmaYx5KcSlHI--v66F-mr-aC689yavBV10qONC-Wd4ti5VO3TgQOivlMTHC6-HzRQmLHn6FEL58I5lfyAxFqSi_OaC_hG0nFDlzfbS1R-6virfN9Omgt3fHYD4HrbsNL7TJGfRS6Oqc9u9j2ISg01W5r165MVyxwO6X0o523ioJgzfPkX8vWDdZJHEYpP5Lj-R1kVY-fgIW7tKB7pVVFQnEkcBBZ7xusUObH88J7oVfiEp35dk46GQlmrqUOHNEoJdLFdXQmIo49liCwjtSmscz0PRTFQmIvacezcSpO0oYG_ry4ZBMupd5VSCjUA', // Get from MailerLite: Settings → Integrations → API
    groups: {
        newsletter: '173760929538770599', 
        review: '173761193104639311'
    }
};

// Small helpers
function normalizeBookSlug(value) {
    if (!value) return '';
    return String(value).trim().replace(/\.html$/i, '');
}

// Capture UTM parameters from URL
function captureUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || ''
    };

    // Populate hidden fields if they exist
    Object.keys(utmParams).forEach(param => {
        const field = document.getElementById(param.replace('_', '-'));
        if (field) field.value = utmParams[param];
    });

    // Also populate any per-book inline hidden fields (e.g. help-discover section)
    // using an ID prefix convention.
    const pairs = [
        ['utm_source', 'help-discover-utm-source-'],
        ['utm_medium', 'help-discover-utm-medium-'],
        ['utm_campaign', 'help-discover-utm-campaign-']
    ];

    pairs.forEach(([key, prefix]) => {
        const nodes = document.querySelectorAll(`[id^="${prefix}"]`);
        nodes.forEach(node => {
            node.value = utmParams[key] || '';
        });
    });

    return utmParams;
}

// Initialize all signup forms
document.addEventListener('DOMContentLoaded', function() {
    // Capture UTM params on page load
    captureUtmParams();

    // Find all signup forms
    const signupForms = document.querySelectorAll('.email-signup');
    signupForms.forEach(form => initializeSignupForm(form));
});

// Initialize a single signup form
function initializeSignupForm(form) {
    const formId = form.id || 'unknown-form';
    let formInteractionTracked = false;

    // Track form interaction on email focus
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            if (!formInteractionTracked) {
                formInteractionTracked = true;
                trackFormEvent('signup_start', formId);
            }
        });
    }

    // Track optional fields expansion
    const optionalDetails = form.querySelector('details.form-optional');
    if (optionalDetails) {
        optionalDetails.addEventListener('toggle', function() {
            if (this.open) {
                trackFormEvent('signup_optional_expanded', formId);
            }
        });
    }

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleFormSubmission(this, formId);
    });
}

// Handle form submission to MailerLite API
async function handleFormSubmission(form, formId) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Validate email
    if (!isValidEmail(email)) {
        trackFormEvent('signup_error', formId, 'invalid_email');
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    submitButton.textContent = 'Verifying...';
    submitButton.disabled = true;

    try {
        // Get reCAPTCHA token
        let recaptchaToken = '';
        if (typeof grecaptcha !== 'undefined') {
            try {
                recaptchaToken = await grecaptcha.execute('6LePxsIrAAAAAL5KZMaM9Gy-gnj62mMul9UnhBjv', {
                    action: 'email_signup'
                });
                const recaptchaField = form.querySelector('[name="_recaptcha"]');
                if (recaptchaField) recaptchaField.value = recaptchaToken;
            } catch (recaptchaError) {
                console.warn('reCAPTCHA failed:', recaptchaError);
            }
        }

        submitButton.textContent = 'Joining...';

        // Collect form data
        const formData = new FormData(form);
        const intent = (formData.get('intent') || 'newsletter').toString();
        const sourcePage = (formData.get('source_page') || 'homepage').toString();

        // Build MailerLite subscriber data
        // Use select value if available, otherwise fall back to hidden field
        const ageInterest = (formData.get('age_band_interest') || formData.get('age_band_interest_hidden') || '').toString();

        const subscriberData = {
            email: email,
            fields: {
                // MailerLite default field key is `name` (not `first_name`)
                name: (formData.get('first_name') || '').toString(),
                book_slug: normalizeBookSlug(formData.get('book_slug') || ''),
                book_title: (formData.get('book_title') || '').toString(),
                series: (formData.get('series') || '').toString(),
                age_band_interest: ageInterest,
                source_page: sourcePage,
                intent: intent,
                customer_status: (formData.get('customer_status') || '').toString(),
                utm_source: (formData.get('utm_source') || '').toString(),
                utm_medium: (formData.get('utm_medium') || '').toString(),
                utm_campaign: (formData.get('utm_campaign') || '').toString()
            },
            groups: [MAILERLITE_CONFIG.groups[intent] || MAILERLITE_CONFIG.groups.newsletter]
        };

        // Collect book interests if present (array field)
        const bookInterests = formData.getAll('book_interests[]').map(v => (v || '').toString()).filter(Boolean);
        if (bookInterests.length > 0) {
            // NOTE: MailerLite will only persist this if you created a custom field named `book_interests`
            subscriberData.fields.book_interests = bookInterests.join(', ');
        }

        // If the signup came from a generic origin (homepage/blog) then book_* fields will be blank.
        // Map them from the selected interest when there is exactly one selection so the values persist.
        if (!subscriberData.fields.book_slug) {
            const checked = form.querySelectorAll('input[name="book_interests[]"]:checked');
            if (checked.length >= 1) {
                // If multiple are checked we still set primary book_* fields from the first
                // selection so the subscriber record gets meaningful context.
                const el = checked[0];
                const inferredSlug = normalizeBookSlug(el.dataset.bookSlug || el.value || '');
                const inferredTitle = (el.dataset.bookTitle || '').toString();
                const inferredSubTitle = (el.dataset.bookSubTitle || '').toString();
                const inferredSeries = (el.dataset.series || '').toString();

                subscriberData.fields.book_slug = inferredSlug;

                // Prefer the base title; include subtitle for clarity.
                subscriberData.fields.book_title = inferredSubTitle
                    ? `${inferredTitle} — ${inferredSubTitle}`
                    : inferredTitle;

                // If series exists, capture it.
                if (inferredSeries) {
                    subscriberData.fields.series = inferredSeries;
                }
            }
        }

        console.log('Submitting to MailerLite:', {
            email,
            intent,
            sourcePage,
            fields: subscriberData.fields,
            groups: subscriberData.groups
        });

        // Submit to MailerLite API
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_CONFIG.apiKey}`
            },
            body: JSON.stringify(subscriberData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('MailerLite error:', errorData);
            throw new Error(errorData.message || `Submission failed: ${response.status}`);
        }

        // Helpful for debugging field persistence issues
        const responseData = await response.json().catch(() => null);
        if (responseData && responseData.data) {
            console.log('MailerLite response:', responseData.data);
        }

        // Success!
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Track conversion
        trackFormConversion(formId, intent, sourcePage, formData);

        // Close signup modal if it's open
        closeSignupModal();

// Show appropriate success message
        if (intent === 'review') {
            const submittedBookTitle = (formData.get('book_title') || '').toString();
            showThankYouModal({
                variant: 'review',
                bookTitle: submittedBookTitle
            }, form);
        } else if (formId === 'email-form' || formId === 'signup-modal-form') {
            showThankYouModal({ variant: 'newsletter' }, form);
        } else {
            showNotification('Thanks! You\'re on the list. We\'ll notify you when this book is available.', 'success');
        }

    } catch (error) {
        console.error('Form submission error:', error);
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        trackFormEvent('signup_error', formId, error.message);
        showNotification('Something went wrong. Please try again or contact us directly.', 'error');
    }
}

// Analytics tracking helpers
function trackFormEvent(eventName, formId, label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': 'form_interaction',
            'event_label': label || formId,
            'form_id': formId
        });
    }
}

function trackFormConversion(formId, intent, source, formData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'signup_complete', {
            'event_category': 'conversion',
            'event_label': `${intent}_${source}`,
            'form_id': formId,
            'intent': intent,
            'source_page': source,
            'age_band': formData.get('age_band_interest') || 'not_provided',
            'customer_status': formData.get('customer_status') || 'not_provided',
            'has_book_interests': formData.getAll('book_interests[]').length > 0,
            'value': 1
        });
    }
}

// Modal functionality
let lastThankYouForm = null;

const THANK_YOU_VARIANTS = {
    newsletter: {
        title: 'Welcome to Our Story Tree!',
        description: 'Thank you for joining our community of book lovers!',
        benefitsTitle: "You'll be the first to know when our book is ready!",
        benefits: ['Release announcements', 'Exclusive previews', 'Behind-the-scenes stories'],
        primaryActionText: 'Continue Reading'
    },
    review: {
        title: 'Thank you for your support!',
        description: "We’ve sent you an email with the review link and a couple of quick steps.",
        benefitsTitle: 'Next steps:',
        benefits: ['Open the email we just sent', 'Tap the Amazon review link', 'Share a short, honest review'],
        primaryActionText: 'Continue Reading'
    }
};

function setThankYouModalContent(options = {}) {
    const modal = document.getElementById('thank-you-modal');
    if (!modal) return;

    const variantKey = options.variant && THANK_YOU_VARIANTS[options.variant]
        ? options.variant
        : 'newsletter';

    const variant = THANK_YOU_VARIANTS[variantKey];

    const titleEl = modal.querySelector('#modal-title');
    const descEl = modal.querySelector('#modal-description');
    const benefitsTitleEl = modal.querySelector('#thank-you-benefits-title');
    const b1 = modal.querySelector('#thank-you-benefit-1');
    const b2 = modal.querySelector('#thank-you-benefit-2');
    const b3 = modal.querySelector('#thank-you-benefit-3');
    const primaryAction = modal.querySelector('#thank-you-primary-action');

    const bookTitle = (options.bookTitle || '').trim();

    if (titleEl) {
        if (variantKey === 'review' && bookTitle) {
            titleEl.textContent = `Thanks for supporting ${bookTitle}!`;
        } else {
            titleEl.textContent = variant.title;
        }
    }

    if (descEl) descEl.textContent = variant.description;
    if (benefitsTitleEl) benefitsTitleEl.textContent = variant.benefitsTitle;

    if (b1) b1.textContent = variant.benefits[0] || '';
    if (b2) b2.textContent = variant.benefits[1] || '';
    if (b3) b3.textContent = variant.benefits[2] || '';

    if (primaryAction) primaryAction.textContent = variant.primaryActionText;
}

function showThankYouModal(options = {}, submittedForm = null) {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        if (submittedForm) lastThankYouForm = submittedForm;
        setThankYouModalContent(options);

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

        // Return focus to the form that triggered the modal
        if (lastThankYouForm) {
            const emailInput = lastThankYouForm.querySelector('input[type="email"]');
            if (emailInput) emailInput.focus();
            lastThankYouForm = null;
            return;
        }

        // Backward-compatible fallback
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

// Signup Modal Functionality
let lastTriggerElement = null;

function openSignupModal(triggerElement) {
    const modal = document.getElementById('signup-modal');
    if (!modal) return;

    lastTriggerElement = triggerElement;

    // Get data from trigger button
    const intent = triggerElement.dataset.intent || 'newsletter';
    const source = triggerElement.dataset.source || 'homepage';
    const bookSlug = triggerElement.dataset.bookSlug || '';
    const bookTitle = triggerElement.dataset.bookTitle || '';
    const series = triggerElement.dataset.series || '';
    const ageRange = triggerElement.dataset.ageRange || '';
    const customerStatus = triggerElement.dataset.customerStatus || '';
    const title = triggerElement.dataset.title || 'Join the Story Tree';
    const subtitle = triggerElement.dataset.subtitle || 'Be first to know about new releases and exclusive content.';
    const buttonText = triggerElement.dataset.buttonText || 'Join the Story Tree';
    const showOptional = triggerElement.dataset.showOptional === 'true';

    // Update modal content
    const modalTitle = modal.querySelector('#signup-modal-title');
    const modalSubtitle = modal.querySelector('#signup-modal-description');
    const submitButton = modal.querySelector('.btn-submit--modal');
    const optionalFields = modal.querySelector('#modal-optional-fields');

    if (modalTitle) modalTitle.textContent = title;
    if (modalSubtitle) modalSubtitle.textContent = subtitle;
    if (submitButton) submitButton.textContent = buttonText;
    if (optionalFields) optionalFields.style.display = showOptional ? 'block' : 'none';

    // Populate hidden fields
    document.getElementById('modal-intent').value = intent;
    document.getElementById('modal-source-page').value = source;
    document.getElementById('modal-book-slug').value = bookSlug;
    document.getElementById('modal-book-title').value = bookTitle;
    document.getElementById('modal-series').value = series;
    document.getElementById('modal-customer-status').value = customerStatus;

    // Set age range - both in select (if visible) and hidden field (for when optional fields are hidden)
    const ageHiddenField = document.getElementById('modal-age-range-hidden');
    if (ageHiddenField) ageHiddenField.value = ageRange;

    if (ageRange) {
        const ageSelect = document.getElementById('modal-age-range');
        if (ageSelect) {
            const option = ageSelect.querySelector(`option[value="${ageRange}"]`);
            if (option) option.selected = true;
        }
    }

    // Capture UTM params
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('modal-utm-source').value = urlParams.get('utm_source') || '';
    document.getElementById('modal-utm-medium').value = urlParams.get('utm_medium') || '';
    document.getElementById('modal-utm-campaign').value = urlParams.get('utm_campaign') || '';

    // Show modal
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');

    // Focus email input
    const emailInput = modal.querySelector('input[type="email"]');
    if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
    }

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Track modal open
    trackFormEvent('signup_modal_opened', `signup-modal-${intent}`);
}

function closeSignupModal() {
    const modal = document.getElementById('signup-modal');
    if (modal) {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');

        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();

        // Restore body scrolling
        document.body.style.overflow = '';

        // Return focus to trigger element
        if (lastTriggerElement) {
            lastTriggerElement.focus();
            lastTriggerElement = null;
        }
    }
}

// Initialize signup modal triggers
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all signup modal triggers
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-signup-modal]');
        if (trigger) {
            e.preventDefault();
            openSignupModal(trigger);
        }
    });

    // Setup signup modal close handlers
    const signupModal = document.getElementById('signup-modal');
    if (signupModal) {
        // Close on X button
        const closeButton = signupModal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeSignupModal);
        }

        // Close on overlay click
        signupModal.addEventListener('click', function(e) {
            if (e.target === signupModal) {
                closeSignupModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && signupModal.classList.contains('is-visible')) {
                closeSignupModal();
            }
        });

        // Initialize form submission
        const signupForm = signupModal.querySelector('#signup-modal-form');
        if (signupForm) {
            initializeSignupForm(signupForm);
        }
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

// Amazon reviews progressive disclosure (no-JS fallback shows all)
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.amazon-reviews[data-max-visible]');

    containers.forEach(container => {
        const maxVisible = parseInt(container.dataset.maxVisible || '5', 10);
        const items = Array.from(container.querySelectorAll('.amazon-review'));
        const toggle = container.querySelector('.amazon-reviews__toggle');

        if (!items.length || !toggle || !Number.isFinite(maxVisible) || maxVisible < 1) return;
        if (items.length <= maxVisible) return;

        // Collapse (JS-only). Without JS, all reviews render.
        items.slice(maxVisible).forEach(item => { item.hidden = true; });

        toggle.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Show more reviews';

        toggle.addEventListener('click', function() {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';

            if (expanded) {
                items.slice(maxVisible).forEach(item => { item.hidden = true; });
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = 'Show more reviews';
            } else {
                items.forEach(item => { item.hidden = false; });
                toggle.setAttribute('aria-expanded', 'true');
                toggle.textContent = 'Show fewer reviews';
            }
        });
    });
});

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
