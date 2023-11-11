document.addEventListener("DOMContentLoaded", function() {
    const questionCard = document.getElementById('questionCard');
    let touchstartX = 0, touchstartY = 0, touchendX = 0, touchendY = 0;
    let currentCardIndex = 0;
    const totalCards = 9; // Assuming you have 9 cards

    // Function to load the next card image
    function loadNextCard() {
        currentCardIndex = (currentCardIndex + 1) % totalCards;
        questionCard.style.backgroundImage = `url('/img/samplecard${currentCardIndex + 1}.png')`;
    }

    // Initialize first card
    loadNextCard();

    function handleGesture() {
        const deltaX = touchendX - touchstartX;
        const deltaY = touchendY - touchstartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal Swipe
            if (deltaX > 0) {
                console.log('Swiped Right');
                // Add animation for swiping right
                questionCard.classList.add('swipe-right');
            } else {
                console.log('Swiped Left');
                // Add animation for swiping left
                questionCard.classList.add('swipe-left');
            }
        } else {
            // Vertical Swipe
            if (deltaY > 0) {
                console.log('Swiped Down');
                // Add animation for swiping down
                questionCard.classList.add('swipe-down');
            } else {
                console.log('Swiped Up');
                // Add animation for swiping up
                questionCard.classList.add('swipe-up');
            }
        }
        // Reset class after animation
        setTimeout(() => {
            questionCard.className = 'question-card';
            loadNextCard();
        }, 600); // Assuming 600ms animation duration
    }

    questionCard.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    });

    questionCard.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesture();
    });
});
