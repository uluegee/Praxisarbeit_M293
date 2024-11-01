// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Select the form and the "Senden" button
    const sendButton = document.getElementById("sendButton");
    const form = document.getElementById("forms");

    // Add a click event listener to the "Senden" button
    sendButton.addEventListener("click", function(event) {
        // Prevent form from submitting and reloading the page
        event.preventDefault();

        // Get values from each input field
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Display the information in the console
        console.clear(); // Clear console for each new submission (optional)
        console.log("========== Kontaktformular ==========");
        console.log("Name & Vorname:", name);
        console.log("Telefonnummer:", phone);
        console.log("Email Adresse:", email);
        console.log("Ihre Nachricht:", message);
        console.log("=====================================");

        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

        // Show confirmation popup
        alert("Ihre Nachricht wurde erfolgreich gesendet!");
    });
});
