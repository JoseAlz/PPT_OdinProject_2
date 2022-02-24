// Get all necessary DOM nodes
const images = Array.from(document.querySelectorAll(".card-image"));
const message = document.querySelector(".message");
const scorePlayer = document.querySelector(".player-score");
const scoreComputer = document.querySelector(".computer-score");
const selectionPlayer = document.querySelector(".player-selection");
const selectionComputer = document.querySelector(".computer-selection");

let playerScore = 0;
let computerScore = 0;

// Start Game when user clicks on an image
images.forEach((image) =>
  image.addEventListener("click", () => {
    if (playerScore >= 5 || computerScore >= 5) {
      return;
    }
    game(image.dataset.image);
  })
);

/* Game Logic */

function getComputerSelection() {
  let computerNumber = random(3);
  let computerGuess = "";

  switch (computerNumber) {
    case 1:
      computerGuess = "Piedra";
      break;
    case 2:
      computerGuess = "Papel";
      break;
    case 3:
      computerGuess = "Tijera";
      break;
    default:
      break;
  }

  return computerGuess;
}

function playRound(playerSelection, computerSelection) {
  let log = "";

  if (playerSelection === "Piedra") {
    if (computerSelection === "Papel") {
      log = "Perdiste! Papel cubre la Piedra";
    } else if (computerSelection === "Tijera") {
      log = "Ganaste! Piedra Rompe Tijera";
    } else {
      log = "Es un Empate!";
    }
  } else if (playerSelection === "Papel") {
    if (computerSelection === "Tijera") {
      log = "Perdiste! Tijera Corta Papel";
    } else if (computerSelection === "Piedra") {
      log = "Ganaste! Papel cubre la Piedra";
    } else {
      log = "Es un Empate!";
    }
  } else if (playerSelection === "Tijera") {
    if (computerSelection === "Piedra") {
      log = "Perdiste! Piedra Rompe Tijera";
    } else if (computerSelection === "Papel") {
      log = "Ganaste! Tijera Corta Papel";
    } else {
      log = "Es un Empate!";
    }
  }

  return log;
}

function createParagWithText(text) {
  const p = document.createElement("p");
  p.textContent = text;

  return p;
}

function game(playerSelect) {
  let playerSelection = capitalize(playerSelect);
  let computerSelection = getComputerSelection();

  let roundResult = playRound(playerSelection, computerSelection);

  if (roundResult.search("Ganaste!") > -1) {
    playerScore++;
  } else if (roundResult.search("Perdiste!") > -1) {
    computerScore++;
  }

  scorePlayer.textContent = playerScore;
  scoreComputer.textContent = computerScore;
  message.textContent = roundResult;
  selectionPlayer.appendChild(createParagWithText(playerSelection));
  selectionComputer.appendChild(createParagWithText(computerSelection));

  if (playerScore >= 5 && computerScore < 5) {
    message.textContent = "Game Over. Ganaste!";
  } else if (playerScore < 5 && computerScore >= 5) {
    message.textContent = "Game Over. Perdiste!";
  }
}

/* Helper Functions */
function random(number) {
  return Math.floor(Math.random() * number + 1);
}

function capitalize(string) {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  );
}
