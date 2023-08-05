const gameOptions = ["rock", "paper", "scissors"];

function computerPlay() {
  return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}

function setGameResult(message, status) {
  return { gameMessage: message, gameStatus: status };
}

/* Single round calculation */
function playSingleRound(playerSelection, computerSelection) {
  if (playerSelection == null) return;

  const gameWinningCombinations = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (playerSelection === computerSelection) {
    return setGameResult("It's a tie!", "tie");
  } else if (gameWinningCombinations[playerSelection] === computerSelection) {
    return setGameResult(`You win! ${playerSelection} beats ${computerSelection}.`, "win");
  } else {
    return setGameResult(`You lose! ${computerSelection} beats ${playerSelection}.`, "loss");
  }
}

/* User input validation */
function validateUserPlay(i = 0) {
  let playerSelection = prompt(`
    Rock, Paper, or Scissors game

    This is your playground, and the rules are simple:
    Play the game for 5 rounds and see if you can beat the computer! 

    Rounds played: ${i}
    Please enter Rock, Paper, or Scissors:`);

  while (!gameOptions.includes(playerSelection.trim().toLowerCase())) {
    playerSelection = prompt(`I don't recognize your selection, let's try it again.\n\nCurrent round: ${i + 1}`);
    if (playerSelection === null) break;
  }

  if (playerSelection === null) {
    return;
  }

  return playSingleRound(playerSelection.trim().toLowerCase(), computerPlay());
}

/* Message display  */
function displayResultMessage(playerScore, computerScore) {
  if (playerScore > computerScore) {
    alert(`Apparently, you won ${playerScore} to ${computerScore}`);
    console.log(`Apparently, you won ${playerScore} to ${computerScore}`);
  } else if (playerScore < computerScore) {
    alert(`HAHA, you lost ${computerScore} to ${playerScore}`);
    console.log(`HAHA, you lost ${computerScore} to ${playerScore}`);
  } else {
    alert("It's a tie. Khm.");
    console.log("It's a tie! Khm.");
  }
}

/* Score update */
function updateScores(result, playerScore, computerScore) {
  if (result.gameStatus === "win") {
    playerScore++;
  } else if (result.gameStatus === "loss") {
    computerScore++;
  }
  return { playerScore, computerScore };
}

/* Game initialization */
function startGame() {
  let playerScore = 0;
  let computerScore = 0;
  const roundsToWin = 5;

  for (let i = 0; i < roundsToWin; i++) {
    const result = validateUserPlay(i);
    if (result == null) return;

    const updatedScores = updateScores(result, playerScore, computerScore);
    playerScore = updatedScores.playerScore;
    computerScore = updatedScores.computerScore;
  }

  displayResultMessage(playerScore, computerScore);
}

startGame();