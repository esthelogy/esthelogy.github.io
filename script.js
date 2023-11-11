document.addEventListener("DOMContentLoaded", function() {
    const questionCard = document.getElementById('questionCard');
    let startX = 0, startY = 0, endX = 0, endY = 0;
    let isDragging = false;
    let currentCardIndex = 0;
    const totalCards = 9; // Assuming you have 9 cards

    function preloadImage(cardIndex) {
        const img = new Image();
        img.src = `/img/samplecard${cardIndex}.png`;
    }

    function loadNextCard() {
        currentCardIndex = (currentCardIndex + 1) % totalCards;
        questionCard.style.backgroundImage = `url('/img/samplecard${currentCardIndex + 1}.png')`;
        questionCard.textContent = ''; // Clear previous text

        // Preload next two cards
        preloadImage((currentCardIndex + 2) % totalCards + 1);
        preloadImage((currentCardIndex + 3) % totalCards + 1);
    }

    loadNextCard();

    function handleGesture() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                questionCard.classList.add('swipe-right');
                questionCard.textContent = 'Yes'; // Display text for right swipe
            } else {
                questionCard.classList.add('swipe-left');
                questionCard.textContent = 'No'; // Display text for left swipe
            }
        } else {
            if (deltaY > 0) {
                questionCard.classList.add('swipe-down');
                questionCard.textContent = 'I don\'t know'; // Display text for down swipe
            } else {
                questionCard.classList.add('swipe-up');
                questionCard.textContent = 'Absolutely'; // Display text for up swipe
                // Optional: Add text for up swipe if needed
            }
        }

        setTimeout(() => {
            questionCard.className = 'question-card';
            loadNextCard();
        }, 600);
    }

    // Touch Events
    questionCard.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    });

    questionCard.addEventListener('touchend', e => {
        endX = e.changedTouches[0].screenX;
        endY = e.changedTouches[0].screenY;
        handleGesture();
    });

    // Mouse Events
    questionCard.addEventListener('mousedown', e => {
        startX = e.screenX;
        startY = e.screenY;
        isDragging = true;
    });

    document.addEventListener('mouseup', e => {
        if (isDragging) {
            endX = e.screenX;
            endY = e.screenY;
            isDragging = false;
            handleGesture();
        }
    });

    questionCard.addEventListener('mousemove', e => {
        if (isDragging) {
            // Optional: Add real-time dragging effect logic here
        }
    });

    // Event listeners for buttons
    document.getElementById('button-x').addEventListener('click', function() {
        questionCard.classList.add('swipe-left');
        questionCard.textContent = 'No';
        setTimeout(() => {
            questionCard.className = 'question-card';
            loadNextCard();
        }, 600);
    });

    document.getElementById('button-o').addEventListener('click', function() {
        questionCard.classList.add('swipe-right');
        questionCard.textContent = 'Yes';
        setTimeout(() => {
            questionCard.className = 'question-card';
            loadNextCard();
        }, 600);
    });

    document.getElementById('button-star').addEventListener('click', function() {
        questionCard.classList.add('swipe-up');
        // Add text or other actions for up swipe if needed
        setTimeout(() => {
            questionCard.className = 'question-card';
            loadNextCard();
        }, 600);
    });

    document.getElementById('button-qmark').addEventListener('click', function() {
        questionCard.classList.add('swipe-down');
        questionCard.textContent = 'I don\'t know';
        setTimeout(() => {
            questionCard.className = 'question-card';
            loadNextCard();
        }, 600);
    });
});
