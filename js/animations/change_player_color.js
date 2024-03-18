// Assuming you have a button with the id "changeColorButton"
const changeColorButton = document.getElementById('changeColorButton');
const playerHeads = document.querySelectorAll('.playerHead');

// Array of color choices
const colorChoices = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

let currentColorIndex = 0;

// Function to change the color of player heads
function changePlayerColor() {
    playerHeads.forEach(playerHead => {
        playerHead.style.fill = colorChoices[currentColorIndex];
        // If you're using stroke color, you can set it like this: playerHead.style.stroke = colorChoices[currentColorIndex];
    });

    // Cycle to the next color
    currentColorIndex = (currentColorIndex + 1) % colorChoices.length;
}

// Event listener for the button click
changeColorButton.addEventListener('click', changePlayerColor);