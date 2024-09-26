Game = createGame();

const tiles = document.querySelectorAll(".tile");

tiles.forEach((tile) =>
	tile.addEventListener("click", () => {
		playRound(tile.id);
	})
);

function createGame() {
	let Game = {
		gameboard: ["", "", "", "", "", "", "", "", ""],
		playerX: {
			playerName: "X's",
		},
		playerO: {
			playerName: "O's",
		},
		currentPlayer: "x",
	};

	return Game;
}

function playRound(tileID) {
	let currentTile = document.querySelector(`#${tileID}`);

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
	} else if (checkBoard(Game.gameboard) === "o") {
		alert(`${Game.playerO.playerName} wins!`);
	}
}

// Check for any winners
function checkBoard(Board) {
	if (
		everyNth(Board, 3, 0) === "x" ||
		everyNth(Board, 3, 1) === "x" ||
		everyNth(Board, 3, 2) === "x" ||
		everyNth(Board, 4, 0) === "x" ||
		everyNth(Board, 2, 2) === "x" ||
		Board.toSpliced(3).every((el) => el === "x") ||
		Board.slice(3, 6).every((el) => el === "x") ||
		Board.toSpliced(0, 6).every((el) => el === "x")
	) {
		return "x";
	} else if (
		everyNth(Board, 3, 0) === "o" ||
		everyNth(Board, 3, 1) === "o" ||
		everyNth(Board, 3, 2) === "o" ||
		everyNth(Board, 4, 0) === "o" ||
		everyNth(Board, 2, 2) === "o" ||
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
