let playerOneTeam = "";

const gameboard = document.querySelector(".gameboard");
const gameModeChoices = document.querySelector(".game-mode-container");
const teamChoices = document.querySelector(".team-choice-container");
const scores = document.querySelector(".scores");
const xScore = document.querySelector(".x-score");
const oScore = document.querySelector(".o-score");

const tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) =>
	tile.addEventListener("click", () => {
		playRound(tile.id);
	})
);

const newGameButton = document.querySelector("#new-game-button");
newGameButton.disabled = true;
newGameButton.addEventListener("click", () => {
	tiles.forEach((tile) => {
		tile.textContent = "";
	});
	Game.gameboard = ["", "", "", "", "", "", "", "", ""];
	Game.playerX.score = 0;
	Game.playerO.score = 0;
	xScore.textContent = Game.playerX.score;
	oScore.textContent = Game.playerO.score;
	Game.currentPlayer = playerOneTeam;
});

const changeModeButton = document.querySelector("#change-mode-button");
changeModeButton.disabled = true;
changeModeButton.addEventListener("click", () => {
	gameboard.style.visibility = "hidden";
	gameModeChoices.style.visibility = "visible";
	scores.style.visibility = "hidden";
	tiles.forEach((tile) => {
		tile.textContent = "";
	});
	Game.gameboard = ["", "", "", "", "", "", "", "", ""];
	Game.playerX.score = 0;
	Game.playerO.score = 0;
	xScore.textContent = Game.playerX.score;
	oScore.textContent = Game.playerO.score;
});

const onePlayerButton = document.querySelector("#one-player-button");
onePlayerButton.addEventListener("click", () => {
	Game.gameMode = "1P";
	gameModeChoices.style.visibility = "hidden";
	teamChoices.style.visibility = "visible";
	document.querySelector("#team-choice-h1").textContent = "Choose your team";
});

const twoPlayerButton = document.querySelector("#two-player-button");
twoPlayerButton.addEventListener("click", () => {
	Game.gameMode = "2P";
	gameModeChoices.style.visibility = "hidden";
	teamChoices.style.visibility = "visible";
	document.querySelector("#team-choice-h1").textContent = "Player one, choose your team";
});

const xTeamButton = document.querySelector("#x-team-button");
xTeamButton.addEventListener("click", () => {
	Game.currentPlayer = "x";
	teamChoices.style.visibility = "hidden";
	gameboard.style.visibility = "visible";
	scores.style.visibility = "visible";
	Game.playerX.score = 0;
	Game.playerO.score = 0;
	xScore.textContent = Game.playerX.score;
	oScore.textContent = Game.playerO.score;
	newGameButton.disabled = false;
	changeModeButton.disabled = false;
	playerOneTeam = "x";
});

const oTeamButton = document.querySelector("#o-team-button");
oTeamButton.addEventListener("click", () => {
	Game.currentPlayer = "o";
	teamChoices.style.visibility = "hidden";
	gameboard.style.visibility = "visible";
	scores.style.visibility = "visible";
	Game.playerX.score = 0;
	Game.playerO.score = 0;
	xScore.textContent = Game.playerX.score;
	oScore.textContent = Game.playerO.score;
	newGameButton.disabled = false;
	changeModeButton.disabled = false;
	playerOneTeam = "o";
});

Game = createGame();

// Creates Game object to store relevant info
function createGame() {
	let Game = {
		gameboard: ["", "", "", "", "", "", "", "", ""],
		playerX: {
			playerName: "X's",
			score: 0,
		},
		playerO: {
			playerName: "O's",
			score: 0,
		},
		currentPlayer: "x",

		gameMode: "",
	};

	return Game;
}

// Handles most everything that should happen when a player clicks a tile
function playRound(tileID) {
	let currentTile = document.querySelector(`#${tileID}`);

	if (Game.gameboard[Number(tileID.slice(-1)) - 1] !== "") {
		return;
	}

	if (Game.currentPlayer === "x") {
		const X = document.createElement("div");
		X.textContent = "X";
		X.classList.add("x-mark");
		currentTile.appendChild(X);
		Game.gameboard[Number(tileID.slice(-1)) - 1] = "x";
		Game.currentPlayer = "o";
	} else if (Game.currentPlayer === "o") {
		const O = document.createElement("div");
		O.textContent = "O";
		O.classList.add("o-mark");
		currentTile.appendChild(O);
		Game.gameboard[Number(tileID.slice(-1)) - 1] = "o";
		Game.currentPlayer = "x";
	} else {
		alert("NO CURRENTPLAYER ERROR");
	}

	if (checkBoard(Game.gameboard) === "x") {
		alert(`${Game.playerX.playerName} wins!`);
		tiles.forEach((tile) => {
			tile.textContent = "";
		});
		Game.gameboard = ["", "", "", "", "", "", "", "", ""];
		Game.playerX.score++;
		xScore.textContent = Game.playerX.score;
		Game.currentPlayer = playerOneTeam;
		return;
	} else if (checkBoard(Game.gameboard) === "o") {
		alert(`${Game.playerO.playerName} wins!`);
		tiles.forEach((tile) => {
			tile.textContent = "";
		});
		Game.gameboard = ["", "", "", "", "", "", "", "", ""];
		Game.playerO.score++;
		oScore.textContent = Game.playerO.score;
		Game.currentPlayer = playerOneTeam;
		return;
	} else if (Game.gameboard.every((el) => el !== "")) {
		alert("Tie!");
		tiles.forEach((tile) => {
			tile.textContent = "";
		});
		Game.gameboard = ["", "", "", "", "", "", "", "", ""];
		Game.currentPlayer = playerOneTeam;
		return;
	}

	if (Game.gameMode === "1P") {
		let rndInt = Math.floor(Math.random() * 9) + 1;
		rndInt = 1;

		while (Game.gameboard[rndInt - 1] === "x" || Game.gameboard[rndInt - 1] === "o") {
			rndInt = Math.floor(Math.random() * 9) + 1;
		}

		if (Game.currentPlayer === "x") {
			const X = document.createElement("div");
			X.textContent = "X";
			X.classList.add("x-mark");
			document.querySelector(`#tile${rndInt}`).appendChild(X);
			Game.gameboard[rndInt - 1] = "x";
			Game.currentPlayer = "o";
		} else if (Game.currentPlayer === "o") {
			const O = document.createElement("div");
			O.textContent = "O";
			O.classList.add("o-mark");
			document.querySelector(`#tile${rndInt}`).appendChild(O);
			Game.gameboard[rndInt - 1] = "o";
			Game.currentPlayer = "x";
		} else {
			alert("NO CURRENTPLAYER ERROR");
		}
		if (checkBoard(Game.gameboard) === "x") {
			alert(`${Game.playerX.playerName} wins!`);
			tiles.forEach((tile) => {
				tile.textContent = "";
			});
			Game.gameboard = ["", "", "", "", "", "", "", "", ""];
			Game.playerX.score++;
			xScore.textContent = Game.playerX.score;
			if (Game.gameMode === "1P") {
				Game.currentPlayer = playerOneTeam;
			}
			return;
		} else if (checkBoard(Game.gameboard) === "o") {
			alert(`${Game.playerO.playerName} wins!`);
			tiles.forEach((tile) => {
				tile.textContent = "";
			});
			Game.gameboard = ["", "", "", "", "", "", "", "", ""];
			Game.playerO.score++;
			oScore.textContent = Game.playerO.score;
			if (Game.gameMode === "1P") {
				Game.currentPlayer = playerOneTeam;
			}
			return;
		} else if (Game.gameboard.every((el) => el !== "")) {
			alert("Tie!");
			tiles.forEach((tile) => {
				tile.textContent = "";
			});
			Game.gameboard = ["", "", "", "", "", "", "", "", ""];
			if (Game.gameMode === "1P") {
				Game.currentPlayer = playerOneTeam;
			}
			return;
		}
	}
}

// Check for any winners
function checkBoard(Board) {
	if (
		everyNth(Board, 3, 0).every((el) => el === "x") ||
		everyNth(Board, 3, 1).every((el) => el === "x") ||
		everyNth(Board, 3, 2).every((el) => el === "x") ||
		everyNth(Board, 4, 0).every((el) => el === "x") ||
		everyNth(Board, 2, 2)
			.toSpliced(3, 1)
			.every((el) => el === "x") ||
		Board.toSpliced(3).every((el) => el === "x") ||
		Board.slice(3, 6).every((el) => el === "x") ||
		Board.toSpliced(0, 6).every((el) => el === "x")
	) {
		return "x";
	} else if (
		everyNth(Board, 3, 0).every((el) => el === "o") ||
		everyNth(Board, 3, 1).every((el) => el === "o") ||
		everyNth(Board, 3, 2).every((el) => el === "o") ||
		everyNth(Board, 4, 0).every((el) => el === "o") ||
		everyNth(Board, 2, 2)
			.toSpliced(3, 1)
			.every((el) => el === "o") ||
		Board.toSpliced(3).every((el) => el === "o") ||
		Board.slice(3, 6).every((el) => el === "o") ||
		Board.toSpliced(0, 6).every((el) => el === "o")
	) {
		return "o";
	}
}

// Creates a copy of input array with only the chosen starting element and every nth element after it
function everyNth(arr, nth, start = 0) {
	newArr = arr.toSpliced(0, start + 1).filter((el, i) => i % nth === nth - 1);
	newArr.splice(0, 0, arr[start]);
	return newArr;
}
