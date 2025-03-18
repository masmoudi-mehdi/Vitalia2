/**
 * Vitalia - Centre d'Amincissement
 * Contact Form Script
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

/**
 * Initialize the contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return; // Exit if form doesn't exist on this page
    
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset form state
        hideMessages();
        
        // Validate the form
        if (validateForm(contactForm)) {
            // Simulate form submission (in a real environment, this would be an AJAX call to a server endpoint)
            submitForm(contactForm);
        }
    });
    
    /**
     * Validate form inputs
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Clear previous error states
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorMessage = input.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        // Check each required input
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'Ce champ est obligatoire');
                isValid = false;
            } else if (input.type === 'email' && input.value.trim()) {
                // Validate email format
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    showError(input, 'Veuillez entrer une adresse email valide');
                    isValid = false;
                }
            } else if (input.type === 'tel' && input.value.trim()) {
                // Validate phone format (simple check for now)
                const phonePattern = /^[0-9\s\+\-\(\)]{8,20}$/;
                if (!phonePattern.test(input.value.trim())) {
                    showError(input, 'Veuillez entrer un numéro de téléphone valide');
                    isValid = false;
                }
            } else if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
                showError(input, 'Veuillez cocher cette case');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Show error message for an input
     * @param {HTMLElement} input - The input with an error
     * @param {string} message - The error message to display
     */
    function showError(input, message) {
        input.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = 'var(--font-size-xs)';
        errorElement.style.marginTop = '5px';
        
        // Add error message after the input
        if (input.type === 'checkbox') {
            input.parentElement.appendChild(errorElement);
        } else {
            input.parentElement.appendChild(errorElement);
        }
        
        // First error gets focus
        if (!document.querySelector('.error')) {
            input.focus();
        }
    }
    
    /**
     * Submit the form data
     * @param {HTMLFormElement} form - The form to submit
     */
    function submitForm(form) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        // In a real implementation, you would use fetch API to submit the form data to your server
        // Here, we'll simulate a form submission with a timeout
        
        // Create FormData object
        const formData = new FormData(form);
        
        // For demonstration, log the form data (remove in production)
        console.log('Form data to be sent:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Simulate network request with a timeout
        setTimeout(() => {
            // Simulate a 90% success rate
            const isSuccess = Math.random() < 0.9;
            
            if (isSuccess) {
                // Handle successful submission
                showSuccessMessage();
                form.reset();
            } else {
                // Handle error
                showErrorMessage();
            }
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 1500);
        
        /*
        // Real implementation with fetch would look like this:
        fetch('your-server-endpoint.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            showSuccessMessage();
            form.reset();
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
            showErrorMessage();
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
        */
    }
    
    /**
     * Show success message and hide the form
     */
    function showSuccessMessage() {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to the success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    /**
     * Show error message
     */
    function showErrorMessage() {
        formError.style.display = 'block';
        
        // Scroll to the error message
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide the error message after 5 seconds
        setTimeout(() => {
            formError.style.display = 'none';
        }, 5000);
    }
    
    /**
     * Hide success and error messages
     */
    function hideMessages() {
        formSuccess.style.display = 'none';
        formError.style.display = 'none';
    }
    
    /**
     * Add input validation on blur
     */
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Skip checkboxes for blur validation
        if (input.type !== 'checkbox') {
            input.addEventListener('blur', function() {
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
                input.classList.remove('error');
                
                if (input.hasAttribute('required') && !input.value.trim()) {
                    showError(input, 'Ce champ est obligatoire');
                } else if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        showError(input, 'Veuillez entrer une adresse email valide');
                    }
                } else if (input.type === 'tel' && input.value.trim()) {
                    const phonePattern = /^[0-9\s\+\-\(\)]{8,20}$/;
                    if (!phonePattern.test(input.value.trim())) {
                        showError(input, 'Veuillez entrer un numéro de téléphone valide');
                    }
                }
            });
        }
    });
}
