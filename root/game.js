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
        mostrarFlex("Tables")

        const boardContainer = document.getElementById("board");
        boardContainer.innerHTML = "";

        for (let playerIndex = 1; playerIndex <= 4; playerIndex++) {
            const playerName = document.getElementById("player" + playerIndex).value;
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
        const playerName = document.getElementById("player" + playerIndex).value.trim();

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

function mostrarFlex(id) {
    const element_new = document.getElementById(id);
    element_new.style.display = "flex";
}

function getRandomNumber() {
    return Math.floor(Math.random() * MAX_NUMBER) + 1;
}

function number() {
    countRounds++;
    const tableros = getTableros();

    if (countRounds < QUANTITY_NUMBERS && !verificarCartonLleno(tableros[0]) && !verificarCartonLleno(tableros[1]) && !verificarCartonLleno(tableros[2]) && !verificarCartonLleno(tableros[3])) {
        let num = randomUniqueNumbers[arrayIndex++];
        const randomNumberElement = document.getElementById("random_number");
        randomNumberElement.innerHTML = num;
        changeCell(num, tableros);
    } else {
        verificarPuntos();
    }
}

function changeCell(aleatorio, tableros) {
    const cells = document.querySelectorAll(".board-cell");

    cells.forEach((cell) => {
        let number = cell.innerHTML;

        if (number == aleatorio) {
            cell.style.backgroundColor = "red";
        }
    });

    tableros.forEach((tablero) => {
        const posicion = encontrarPosicion(tablero, aleatorio);

        if (posicion != -1) {
            tablero[posicion["fila"]][posicion["columna"]] = "x";
        }
    });
}

function getTableros() {
    const tableros = [];

    for (let i = 1; i <= 4; i++) {
        const board = document.getElementById("contenedor_jugador" + i);
        tableros.push(board);
    }

    return tableros;
}

function DeleteDashboard() {
    const formElement = document.getElementById("form");
    formElement.style.display = "none";
}

function mostrarFlex(id) {
    const element = document.getElementById(id);
    element.style.display = "flex";
}

function getRandomUniqueNumbers(min, max, quantity) {
    if (max - min + 1 < quantity) {
        return "Cannot generate the requested quantity of numbers within the given range.";
    }

    let numbers = [];
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }

    let randomNumbers = [];
    for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNumber = numbers[randomIndex];
        numbers.splice(randomIndex, 1);
        randomNumbers.push(randomNumber);
    }

    return randomNumbers;
}

function hideTables(jugador) {
    const jugadores = ["player1", "player2", "player3", "player4"];
    const tableros = ["contenedor_jugador1", "contenedor_jugador2", "contenedor_jugador3", "contenedor_jugador4"];

    resetearValores();

    jugadores.forEach((jug, index) => {
        if (jug === jugador.id) {
            tableros.forEach((tab, idx) => {
                if (idx !== index) {
                    const tablero = document.getElementById(tab);
                    tablero.style.display = "none";
                }
            });
        }
    });
}

function resetearValores() {
    const jugadores = ["contenedor_jugador1", "contenedor_jugador2", "contenedor_jugador3", "contenedor_jugador4"];

    jugadores.forEach((jugador) => {
        const tablero = document.getElementById(jugador);
        tablero.style.display = "flex";
        tablero.style.flexDirection = "column";
    });
}

function showDashboard() {
    countRounds = 0;
    const elementsToHide = ["Tables", "puntajes", "victorias"];

    elementsToHide.forEach((elementId) => {
        const element = document.getElementById(elementId);
        element.style.display = "none";

        if (elementId === "List") {
            element.innerHTML = ""; // Clear the content of the list
        }
    });

    const formElement = document.getElementById("form");
    formElement.style.display = "flex";
    formElement.style.flexDirection = "column";
    formElement.style.justifyContent = "center";
}

function verificarCartonLleno(matriz) {
    return matriz.every(row => row.every(cell => cell === "x"));
}

function encontrarPosicion(matriz, valor) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] == valor) {
                return { fila: i, columna: j };
            }
        }
    }
    return -1;
}

function verificarDiagonalPrincipal(matriz) {
    return matriz.every((row, index) => row[index] === "x");
}

function verificarDiagonalSecundaria(matriz) {
    const n = matriz.length;
    return matriz.every((row, index) => row[n - 1 - index] === "x");
}

function filasConX(matriz) {
    return matriz.reduce((contador, fila) => {
        return fila.every(cell => cell === "x") ? contador + 1 : contador;
    }, 0);
}

function columnasConX(matriz) {
    const n = matriz[0].length;
    let contador = 0;
    for (let j = 0; j < n; j++) {
        if (matriz.every(row => row[j] === "x")) {
            contador++;
        }
    }
    return contador;
}

function verificarPuntos() {
    const puntos = [0, 0, 0, 0];

    const element = document.getElementById("Tables");
    element.style.display = "none";

    const element1 = document.getElementById("scores");
    element1.style.display = "flex";

    for (let i = 0; i < 4; i++) {
        const jugadorIndex = i + 1;
        const jugadorInput = document.getElementById(`player${jugadorIndex}`);
        const jugadorNombre = jugadorInput.value;

        const lleno = verificarCartonLleno(tableros[i]);
        const principal = verificarDiagonalPrincipal(tableros[i]);
        const secundaria = verificarDiagonalSecundaria(tableros[i]);
        const filas = filasConX(tableros[i]);
        const columnas = columnasConX(tableros[i]);

        puntos[i] += lleno ? 5 : 0;
        puntos[i] += principal ? 3 : 0;
        puntos[i] += secundaria ? 3 : 0;
        puntos[i] += filas + columnas;

        const jugadorpuntos = document.createElement('li');
        jugadorpuntos.innerHTML = `${jugadorNombre}: ${puntos[i]}`;
        const list = document.getElementById("List");
        list.appendChild(jugadorpuntos);

        if (validarNombreEnLocalStorage(jugadorNombre)) {
            let puntajeprevio = localStorage.getItem(jugadorNombre);
            let valor = parseInt(puntajeprevio);
            valor += puntos[i];
            localStorage.setItem(jugadorNombre, valor);
        } else {
            localStorage.setItem(jugadorNombre, puntos[i]);
        }
    }
}

function mostrarVictorias() {
    const element_new2 = document.getElementById("victories");
    element_new2.style.display = "flex";

    DeleteDashboard();

    const lista = document.getElementById("Listvictorias");
    lista.innerHTML = '';

    // Iterate over localStorage keys and display player victories
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const element = document.createElement("li");
        element.textContent = `${key}: ${value}`;
        lista.appendChild(element);
    }
}

function validarNombreEnLocalStorage(nombre) {
    // Verificar si la clave (key) existe en localStorage
    return localStorage.getItem(nombre) !== null;
}

