"use strict";
// Rock-Paper-Scissors Game Script
//Interactive RPS game with animations, sound effects, and score logic.

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
         shake: document.getElementById("shake-sound"),
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
         [playerScoreElem, computerScoreElem].forEach((el) => {
            el.classList.add("score-animate");
            setTimeout(() => el.classList.remove("score-animate"), 500);
         });
      };

      // Safely play a sound if it exists
      const playSound = (key) => {
         sounds[key]?.play();
      };

      // Set the hand image icons according to selected choice
      const setHands = (player, computer) => {
         playerHand.src = `./assets/images/${player}.svg`;
         computerHand.src = `./assets/images/${computer}.svg`;
      };

      const decideWinner = (player, computer) => {
         let message = "";

         if (player === computer) {
            message = `It's a Draw! You both chose ${player}.`;
            playSound("draw");
         } else {
            const playerWins =
               (player === "rock" && computer === "scissors") ||
               (player === "paper" && computer === "rock") ||
               (player === "scissors" && computer === "paper");

            if (playerWins) {
               playerScore++;
               playSound("win");
            } else {
               computerScore++;
               playSound("lose");
            }

            updateScoreboard();

            // Check for end-game condition (first to 3)
            if (playerScore === 3 || computerScore === 3) {
               isGameOver = true;

               if (playerScore === 3) {
                  message = "🎉 You won the match!";
                  celebrate();
                  playSound("victory");
               } else {
                  message = "😭 You lost the match!";
                  defeatRain();
                  playSound("defeat");
               }

               resultDisplay.classList.add("winner-large");
            } else {
               // Mid-match win/lose message
               message = playerWins
                  ? `You win! ${player} beats ${computer}.`
                  : `You lose! ${computer} beats ${player}.`;
               resultDisplay.classList.remove("winner-large");
            }
         }

         // Display result with animation
         resultDisplay.textContent = message;
         resultDisplay.classList.remove("winner-slow-blink");
         void resultDisplay.offsetWidth; // Reflow to restart animation
         resultDisplay.classList.add("winner-slow-blink");
      };

      // 🎉 Confetti celebration effect (win)
      const celebrate = () => {
         if (typeof confetti !== "function") {
            return;
         }
         const end = Date.now() + 3000;
         // Create a confetti effect with two angles
         (function frame() {
            confetti({
               particleCount: 5,
               angle: 60,
               spread: 55,
               origin: { x: 0 },
            });
            confetti({
               particleCount: 5,
               angle: 120,
               spread: 55,
               origin: { x: 1 },
            });
            if (Date.now() < end) requestAnimationFrame(frame);
         })();
      };

      // 😭 Defeat animation with dark confetti (lose)
      const defeatRain = () => {
         if (typeof confetti !== "function") return;
         const end = Date.now() + 5000;
         (function frame() {
            confetti({
               particleCount: 2,
               angle: 90,
               spread: 30,
               startVelocity: 10,
               gravity: 0.3,
               ticks: 400,
               origin: { x: Math.random(), y: 0 },
               colors: ["#4b6cb7", "#182848", "#555"],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
         })();
      };

      // Reset the state to allow replaying
      const resetGame = () => {
         playerScore = 0;
         computerScore = 0;
         isGameOver = false;
         updateScoreboard();
         setHands("rock", "rock");
         resultDisplay.textContent = "Choose your weapon!";
         resultDisplay.classList.remove("winner-slow-blink");
      };

      // Game setup — attaches events and initializes logic
      const initializeGame = () => {
         if (!startButton || !introScreen || !matchScreen) return;

         // Ensure hands reset animations cleanly
         hands.forEach((hand) =>
            hand.addEventListener("animationend", () => {
               hand.style.animation = "";
            })
         );

         // Add event listeners for game choices
         options.forEach((button) => {
            button.addEventListener("click", () => {
               if (isGameOver) return;

               const playerChoice = button.textContent.trim().toLowerCase();

               const randomIndex = Math.floor(Math.random() * choices.length);
               const computerChoice = choices[randomIndex];

               // Animate hands before revealing result
               setHands("rock", "rock");
               playSound("shake");
               playerHand.style.animation = "shakePlayer 2s ease";
               computerHand.style.animation = "shakeComputer 2s ease";

               setTimeout(() => {
                  setHands(playerChoice, computerChoice);
                  decideWinner(playerChoice, computerChoice);
               }, 2000);
            });
         });

         // Handle game reset
         resetBtn?.addEventListener("click", resetGame);
      };

      // Initialize the game when the start button is clicked
      initializeGame(); // Begin game setup
   };

   game(); // Launch the main game logic
});
