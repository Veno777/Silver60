document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle aria-expanded for accessibility
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        });
    }

    // Text size adjustment functionality
    const increaseTextBtn = document.getElementById('increase-text');
    const decreaseTextBtn = document.getElementById('decrease-text');
    const body = document.body;
    
    // Default text size class
    if (!body.classList.contains('text-size-1') && 
        !body.classList.contains('text-size-2') && 
        !body.classList.contains('text-size-3')) {
        body.classList.add('text-size-1');
    }

    if (increaseTextBtn) {
        increaseTextBtn.addEventListener('click', () => {
            if (body.classList.contains('text-size-1')) {
                body.classList.replace('text-size-1', 'text-size-2');
            } else if (body.classList.contains('text-size-2')) {
                body.classList.replace('text-size-2', 'text-size-3');
            }
            // Store preference in localStorage
            localStorage.setItem('textSize', body.className);
        });
    }

    if (decreaseTextBtn) {
        decreaseTextBtn.addEventListener('click', () => {
            if (body.classList.contains('text-size-3')) {
                body.classList.replace('text-size-3', 'text-size-2');
            } else if (body.classList.contains('text-size-2')) {
                body.classList.replace('text-size-2', 'text-size-1');
            }
            // Store preference in localStorage
            localStorage.setItem('textSize', body.className);
        });
    }

    // Load saved text size preference
    const savedTextSize = localStorage.getItem('textSize');
    if (savedTextSize) {
        body.className = savedTextSize;
    }

    // Page reading functionality
    const readPageBtn = document.getElementById('read-page');
    
    if (readPageBtn) {
        readPageBtn.addEventListener('click', () => {
            // Get all headings and paragraphs
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const paragraphs = document.querySelectorAll('p');
            
            let textToRead = 'Welcome to Silver 60. ';
            
            // Add headings to text to read
            headings.forEach(heading => {
                textToRead += heading.textContent + '. ';
            });
            
            // Add paragraphs to text to read
            paragraphs.forEach(paragraph => {
                textToRead += paragraph.textContent + '. ';
            });
            
            // Use the SpeechSynthesis API to read the text
            const speech = new SpeechSynthesisUtterance(textToRead);
            speech.rate = 0.9; // Slightly slower for better comprehension
            speech.pitch = 1;
            speech.volume = 1;
            
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            // Read the text
            window.speechSynthesis.speak(speech);
            
            // Add stop reading button if it doesn't exist
            if (!document.getElementById('stop-reading')) {
                const stopBtn = document.createElement('button');
                stopBtn.id = 'stop-reading';
                stopBtn.textContent = 'Stop Reading';
                stopBtn.className = 'btn-access';
                stopBtn.style.backgroundColor = '#e74c3c';
                stopBtn.style.color = 'white';
                
                stopBtn.addEventListener('click', () => {
                    window.speechSynthesis.cancel();
                    stopBtn.remove();
                });
                
                document.querySelector('.accessibility-controls').appendChild(stopBtn);
                
                // Remove stop button when speech ends
                speech.onend = () => {
                    if (document.getElementById('stop-reading')) {
                        document.getElementById('stop-reading').remove();
                    }
                };
            }
        });
    }

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