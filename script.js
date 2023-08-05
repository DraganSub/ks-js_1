// Declare game options
const gameOptions = ["Rock", "Paper", "Scissors"];

// Return random rock, paper or scisors
function computerPlay() {
  const randomGameOptionIndex = Math.floor(Math.random() * gameOptions.length);
  return gameOptions[randomGameOptionIndex];
}

// Set game result per round 
function setGameResult(message, status) {
  return {
    gameMessage: message,
    gameStatus: status,
  };
}

// Play single round of the game 
function playSingleRound(playerSelection, computerSelection) {

  const playerSelectionLowecase = playerSelection.toLowerCase();
  const computerSelectionLowercase = computerSelection.toLowerCase();

  const gameWinningCombinations = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (playerSelection === computerSelection.toLowerCase()) {
    console.log("It's a tie!");
    return setGameResult("It's a tie!", "tie");
  } else if (gameWinningCombinations[playerSelectionLowecase] === computerSelectionLowercase) {
    console.log(`You win! ${playerSelectionLowecase} beats ${computerSelectionLowercase}.`);
    return setGameResult(`You win! ${playerSelectionLowecase} beats ${computerSelectionLowercase}.`, "win");
  } else {
    console.log(`You lose! ${computerSelection} beats ${playerSelection}.`)
    return setGameResult(`You lose! ${computerSelection} beats ${playerSelection}.`, "loss");
  }
}

function startGame() {
  let playerScore = 0;
  let computerScore = 0;
  const roundsToWin = 5;

  for (let i = 0; i < roundsToWin; i++) {
    let playerSelection = prompt("Please enter Rock, Paper or Scissors:");

    const playerSelectionList = gameOptions.map(gameOption => gameOption.toLowerCase());

    /* Guard for correct user input */

    while (!playerSelectionList.includes(playerSelection)) {
      /* Escape in case of game canceling */
      if (playerSelection == null) break;

      playerSelection = prompt("I don't recognize your selection, let's try it again.");
    }

    const computerSelection = computerPlay();
    const result = playSingleRound(playerSelection, computerSelection);

    console.log(result);

    // Update scores
    if (result.gameStatus === "win") {
      playerScore++;
    } else if (result.gameStatus === "loss") {
      computerScore++;
    }
  }

  // Determine the overall winner
  if (playerScore > computerScore) {
    alert(`Apparently, you won ${playerScore} to ${computerScore}`);
    console.log(`Apparently, you won ${playerScore} to ${computerScore}`);
  } else if (playerScore < computerScore) {
    alert(`HAHA, you lost ${computerScore} to ${playerScore}`);
    console.log("HAHA, you lost ${computerScore} to ${playerScore}");
  } else {
    /* Guard if roundsToWin variable change its value */
    alert("It's a tie. Khm.");
    console.log("It's a tie! Khm.");
  }
}

startGame();
