document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Text size adjustment
    const increaseTextBtn = document.getElementById('increaseText');
    const decreaseTextBtn = document.getElementById('decreaseText');
    const body = document.body;

    // Load saved text size preference
    const savedTextSize = localStorage.getItem('textSize') || '1';
    body.classList.add(`text-size-${savedTextSize}`);

    if (increaseTextBtn && decreaseTextBtn) {
        increaseTextBtn.addEventListener('click', () => {
            const currentSize = parseInt(savedTextSize);
            if (currentSize < 3) {
                body.classList.remove(`text-size-${currentSize}`);
                body.classList.add(`text-size-${currentSize + 1}`);
                localStorage.setItem('textSize', currentSize + 1);
            }
        });

        decreaseTextBtn.addEventListener('click', () => {
            const currentSize = parseInt(savedTextSize);
            if (currentSize > 1) {
                body.classList.remove(`text-size-${currentSize}`);
                body.classList.add(`text-size-${currentSize - 1}`);
                localStorage.setItem('textSize', currentSize - 1);
            }
        });
    }

    // Page reading functionality
    const readPageBtn = document.getElementById('readPage');
    let speechSynthesis = window.speechSynthesis;
    let isReading = false;

    if (readPageBtn) {
        readPageBtn.addEventListener('click', () => {
            if (isReading) {
                speechSynthesis.cancel();
                readPageBtn.textContent = 'Read Page';
                isReading = false;
            } else {
                const mainContent = document.querySelector('main');
                const text = mainContent.textContent;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.9; // Slightly slower for better comprehension
                speechSynthesis.speak(utterance);
                readPageBtn.textContent = 'Stop Reading';
                isReading = true;

                utterance.onend = () => {
                    readPageBtn.textContent = 'Read Page';
                    isReading = false;
                };
            }
        });
    }

    // Update copyright year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    
    if (billingToggle) {
        // Check if there's a saved preference
        const savedBillingPref = localStorage.getItem('billingPreference');
        if (savedBillingPref === 'yearly') {
            billingToggle.checked = true;
            document.body.classList.add('yearly');
        }
        
        billingToggle.addEventListener('change', () => {
            if (billingToggle.checked) {
                document.body.classList.add('yearly');
                localStorage.setItem('billingPreference', 'yearly');
            } else {
                document.body.classList.remove('yearly');
                localStorage.setItem('billingPreference', 'monthly');
            }
        });
    }

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // Toggle active class on parent
                const faqItem = question.parentElement;
                
                // If this item is already active, just close it
                if (faqItem.classList.contains('active')) {
                    faqItem.classList.remove('active');
                } else {
                    // Close all other open FAQs
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Open this FAQ
                    faqItem.classList.add('active');
                }
            });
        });

        // Auto-open first FAQ for better UX
        if (faqQuestions.length > 0 && window.innerWidth > 768) {
            faqQuestions[0].parentElement.classList.add('active');
        }
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                phone: contactForm.querySelector('#phone').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value,
                callback: contactForm.querySelector('#callback').checked
            };
            
            // Simulate form submission (in a real site, this would be an API call)
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <img src="images/check-circle.svg" alt="Success icon">
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                        ${formData.callback ? '<p>Since you requested a call back, we will call you at the provided number.</p>' : ''}
                    </div>
                `;
                
                // Scroll to success message
                contactForm.scrollIntoView({behavior: 'smooth'});
            }, 1500);
        });
    }

    // Live chat functionality
    const startChatBtn = document.querySelector('.start-chat-btn');
    
    if (startChatBtn) {
        startChatBtn.addEventListener('click', () => {
            // In a real implementation, this would initialize a chat widget
            alert('This feature would open a live chat with our support team. For this demo, please contact us by phone or email.');
        });
    }

    // Video testimonial player
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // In a real implementation, this would load and play a video
            alert('This feature would play a video testimonial. For this demo, videos are not included.');
        });
    }
}); 