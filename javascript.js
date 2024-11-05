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

    let hasInteracted = {
        name: false,
        phone: false,
        email: false,
        message: false
    };

    // Helper function to add or remove error message
    function toggleError(input, condition, message, fieldName) {
        if (!hasInteracted[fieldName]) return; // Skip if field has not been interacted with

        let errorElement = input.nextElementSibling;

        if (!condition) {
            input.classList.add('error-border');
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
        const namePattern = /^[A-Za-zÀ-ÿ\s'-]+$/; // Allows only letters and spaces
        const phonePattern = /^[0-9]+$/;          // Allows only numbers

        // Validate each field and show error if necessary
        toggleError(nameInput, namePattern.test(nameInput.value.trim()), "Nur Buchstaben und Leerzeichen sind erlaubt.", 'name');
        toggleError(phoneInput, phonePattern.test(phoneInput.value.trim()), "Nur Ziffern sind erlaubt.", 'phone');
        toggleError(emailInput, emailInput.value.includes("@") && emailInput.value.includes("."), "Ungültige E-Mail-Adresse.", 'email');
        toggleError(messageInput, messageInput.value.trim() !== "", "Dieses Feld darf nicht leer sein.", 'message');

        // Check overall validity by checking if any field has 'error-border' class
        isValid = !document.querySelector('.error-border');

        // Enable or disable the send button based on validity
        sendButton.disabled = !isValid;
    }

    // Attach event listeners to validate on input and mark fields as interacted
    [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
        const fieldName = input.id;
        input.addEventListener('input', () => {
            hasInteracted[fieldName] = true;
            validateForm();
        });
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

            // Reset interaction flags
            hasInteracted = { name: false, phone: false, email: false, message: false };

            // Re-validate form to disable button until fields are filled again
            validateForm();
        }
    });

    // Initial validation to disable button on load
    sendButton.disabled = true;
});

document.getElementById("sendButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevents the default submit behavior
  
    // Your form submission logic here (if any)
  
    // Show the success message
    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
    successMessage.innerHTML = "✅ Ihre Nachricht wurde erfolgreich gesendet!";
    
    // Optionally, clear the form fields if it's inside a form
    document.getElementById("contactForm").reset();
  
    // Set a timer to hide the message after 3 seconds (3000 milliseconds)
    setTimeout(function() {
      successMessage.style.display = "none";
    }, 3000);
  });
  