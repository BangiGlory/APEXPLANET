// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get the contact button element by its ID
    const contactButton = document.getElementById('contactBtn');

    // Add a click event listener to the button
    contactButton.addEventListener('click', () => {
        // Change the button's text content when clicked
        contactButton.textContent = 'Email: contact@example.com';

        // Optional: Disable the button after click to prevent further clicks
        contactButton.disabled = true;
    });

    console.log("Portfolio page loaded and script is running!");

});