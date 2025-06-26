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

     // Core game logic encapsulated in a function (modular design)
     const game = () => {
          let playerScore = 0;
          let computerScore = 0;
          let isGameOver = false;

          // Audio references for feedback
          const sounds = {
               win: document.getElementById("win-sound"),
               lose: document.getElementById("lose-sound"),
               draw: document.getElementById("draw-sound"),
               victory: document.getElementById("victory-sound"),
               defeat: document.getElementById("defeat-sound"),
               shake: document.getElementById("shake-sound")
          };

          // Cached DOM references for performance and readability
          const startButton = document.querySelector(".flipBtn");
          const introScreen = document.querySelector(".intro");
          const matchScreen = document.querySelector(".match");
          const options = document.querySelectorAll(".options button");
          const playerHand = document.querySelector(".player-hand");
          const computerHand = document.querySelector(".computer-hand");
          const hands = document.querySelectorAll(".hands img");
          const playerScoreElem = document.querySelector(".player-score p");
          const computerScoreElem = document.querySelector(".computer-score p");
          const resultDisplay = document.querySelector(".winner");
          const resetBtn = document.getElementById("reset");
          const choices = ["rock", "paper", "scissors"];

          // Updates the scoreboard and triggers animation
          const updateScoreboard = () => {
               playerScoreElem.textContent = playerScore;
               computerScoreElem.textContent = computerScore;

               // Simple score-change animation
               [playerScoreElem, computerScoreElem].forEach(el => {
                    el.classList.add("score-animate");
                    setTimeout(() => el.classList.remove("score-animate"), 500);
               });
          };

          

          



          

          initializeGame(); // Begin game setup
     };

     game(); // Launch the main game logic
});
