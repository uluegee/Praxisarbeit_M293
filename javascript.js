// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Select the form and the "Senden" button
    const form = document.getElementById("forms");
    const sendButton = document.getElementById("sendButton");

    // Get elements for each input field
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Helper function to add or remove error message
    function toggleError(input, condition, message) {
        let errorElement = input.nextElementSibling;
        
        if (!condition) {
            input.classList.add('error-border');
            sendButton.disabled = true;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                errorElement.style.color = 'red';
                errorElement.textContent = message;
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
        } else {
            input.classList.remove('error-border');
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.remove();
            }
        }
    }

    // Validation function for all fields
    function validateForm() {
        let isValid = true;

        // Regular expressions for validation
        const namePattern = /^[A-Za-zÀ-ÿ\s'-]+$/;// Allows only letters and spaces
        const phonePattern = /^[0-9]+$/;     // Allows only numbers (already enforced by pattern in HTML)

        // Validate each field and show error if necessary
        toggleError(nameInput, namePattern.test(nameInput.value.trim()), "Nur Buchstaben und Leerzeichen sind erlaubt.");
        toggleError(phoneInput, phonePattern.test(phoneInput.value.trim()), "Nur Ziffern sind erlaubt.");
        toggleError(emailInput, emailInput.value.includes("@") && emailInput.value.includes("."), "Ungültige E-Mail-Adresse.");
        toggleError(messageInput, messageInput.value.trim() !== "", "Dieses Feld darf nicht leer sein.");

        // Check overall validity by checking if any field has 'error-border' class
        isValid = !document.querySelector('.error-border');

        // Enable or disable the send button based on validity
        sendButton.disabled = !isValid;
    }

    // Attach event listeners to validate on input
    [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Add a click event listener to the "Senden" button to handle form submission
    sendButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        if (!sendButton.disabled) {
            console.clear(); // Clear console for each new submission (optional)
            console.log("========== Kontaktformular ==========");
            console.log("Name & Vorname:", nameInput.value.trim());
            console.log("Telefonnummer:", phoneInput.value.trim());
            console.log("Email Adresse:", emailInput.value.trim());
            console.log("Ihre Nachricht:", messageInput.value.trim());
            console.log("=====================================");

            // Clear the form fields
            nameInput.value = '';
            phoneInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

            // Show confirmation popup
            alert("Ihre Nachricht wurde erfolgreich gesendet!");

            // Re-validate form to disable button until fields are filled again
            validateForm();
        }
    });

    // Initial validation to disable button on load
    validateForm();
});
