$(document).ready(function() {
    // Function to animate a single citation word by word
    function animateCitation(citationElement, citationText) {
        const words = citationText.split(" ");
        let currentWordIndex = 0;

        // Function to display each word one by one
        function displayWordByWord() {
            if (currentWordIndex < words.length) {
                citationElement.textContent += words[currentWordIndex] + " "; // Add each word
                currentWordIndex++;
                setTimeout(displayWordByWord, 175); // Time between each word
            }
        }

        citationElement.textContent = ""; // Clear the citation
        displayWordByWord(); // Start animating the words
    }

    // Function to reset the quote when it leaves the viewport
    function resetCitation(citationElement) {
        citationElement.textContent = ""; // Clear the text when resetting
    }

    // Intersection Observer options
    const observerOptions = {
        root: null, // Default is the viewport
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Callback for Intersection Observer
    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            const citationElement = entry.target.querySelector('p[id^="animated-citation"]');
            const citationText = entry.target.getAttribute('data-citation');

            if (entry.isIntersecting) {
                // Animate the quote when it enters the viewport
                animateCitation(citationElement, citationText);
            } else {
                // Reset the quote when it leaves the viewport
                resetCitation(citationElement);
            }
        });
    }

    // Create a new observer
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe each citation container
    $('.citation-container').each(function() {
        observer.observe(this);
    });
});
