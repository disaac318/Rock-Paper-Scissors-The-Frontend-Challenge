// Rock-Paper-Scissors Game Script
// Author: Dean Isaac
// Description: Interactive RPS game with animations, sound effects, and score logic.

document.addEventListener("DOMContentLoaded", () => {
     // Get flip button and card for intro-to-match screen transition
     const flipBtn = document.getElementById("flipBtn");
     const flipCard = document.getElementById("flipCard");
     const wooshSound = document.getElementById("wooshSound");

     // Flip the card to show the match screen when flip button is clicked
     flipBtn.addEventListener("click", () => {
          flipCard.classList.add("flipped");
          wooshSound.play();
     });











     
});