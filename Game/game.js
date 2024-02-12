let tableros = [];
const MIN_NUMBER = 1;
const MAX_NUMBER = 50;
const QUANTITY_NUMBERS = 50;

// Generate an array of unique random numbers
const randomUniqueNumbers = getRandomUniqueNumbers(MIN_NUMBER, MAX_NUMBER, QUANTITY_NUMBERS);
let countRounds = 0;
let arrayIndex = 0;

function generateBoard(size) {
    if (validatePlayerNames()) {
        resetGameData();

        const boardContainer = document.getElementById("board");
        boardContainer.innerHTML = "";

        for (let playerIndex = 1; playerIndex <= 4; playerIndex++) {
            const playerName = document.getElementById("jugador" + playerIndex).value;
            const playerContainer = createPlayerContainer(playerName, playerIndex);

            const playerBoard = createPlayerBoard(size);
            playerContainer.appendChild(playerBoard);

            boardContainer.appendChild(playerContainer);
        }
    } else {
        alert('Please enter unique player names!');
    }
}

function resetGameData() {
    tableros = [];
    countRounds = 0;
    arrayIndex = 0;
    DeleteDashboard();
}

function createPlayerContainer(playerName, playerIndex) {
    const container = document.createElement("div");
    const name = document.createElement("div");

    name.innerHTML = playerName;
    name.classList.add("player-name" + playerIndex);
    container.appendChild(name);
    container.id = "contenedor_jugador" + playerIndex;

    return container;
}

function createPlayerBoard(size) {
    const tablero = document.createElement("div");

    if (size === 3) {
        tablero.classList.add("table3");
    } else if (size === 4) {
        tablero.classList.add("table4");
    } else {
        tablero.classList.add("table5");
    }

    const tableroarray = [];

    while (tableroarray.length < size) {
        const filas = [];

        while (filas.length < size) {
            const cell = document.createElement("div");
            cell.classList.add("board-cell");
            const num = getRandomNumber();

            if (!filas.includes(num) && !tableroarray.includes(num) && !tableroarray.flat().includes(num)) {
                filas.push(num);
                cell.textContent = num;
                tablero.appendChild(cell);
            }
        }
        tableroarray.push(filas);
    }

    tableros.push(tableroarray);

    return tablero;
}

function validatePlayerNames() {
    const playerNames = [];

    for (let playerIndex = 1; playerIndex <= 4; playerIndex++) {
        const playerName = document.getElementById("jugador" + playerIndex).value.trim();

        if (!playerName) {
            return false;
        }

        if (playerNames.includes(playerName)) {
            return false;
        }

        playerNames.push(playerName);
    }

    return true;
}
