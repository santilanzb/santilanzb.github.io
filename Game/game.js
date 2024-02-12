let tableros = [];

const min = 1;
const max = 50;
const quantity = 50;
const randomUniqueNumbers = getRandomUniqueNumbers(min, max, quantity);
var arrayindex = 0;

function generateBoard(size) {
    if (validarNombres()) {
        tableros = [];
        countRounds = 0;
        arrayindex = 0;
        DeleteDashboard();

        mostrarFlex("Tables");

        const boardContainer = document.getElementById("board");
        boardContainer.innerHTML = "";

        for (let j = 1; j <= 4; j++) {
            const playerName = document.getElementById(`player${j}`).value;
            const container = document.createElement("div");
            const playerNameElement = document.createElement("div");

            playerNameElement.innerHTML = playerName;
            playerNameElement.classList.add(`player-name${j}`);
            container.appendChild(playerNameElement);
            container.id = `container_player${j}`;

            let tableroarray = [];
            const tablero = document.createElement("div");

            if (size === 3) {
                tablero.classList.add("table3");
            } else if (size === 4) {
                tablero.classList.add("table4");
            } else {
                tablero.classList.add("table5");
            }

            while (tableroarray.length < size) {
                const rows = [];
                while (rows.length < size) {
                    const cell = document.createElement("div");
                    cell.classList.add("board-cell");
                    const num = getRandomNumber();
                    if (!rows.includes(num) && !tableroarray.includes(num) && !tableroarray.flat().includes(num)) {
                        rows.push(num);
                        cell.textContent = num;
                        tablero.appendChild(cell);
                    }
                }
                tableroarray.push(rows);
            }

            container.appendChild(tablero);
            boardContainer.appendChild(container);
            tableros.push(tableroarray);
        }
    } else {
        alert('Debes ingresar los nombres de los jugadores y sin repetirlos!');
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
}

function getRandomUniqueNumbers(min, max, quantity) {
    if (max - min + 1 < quantity) {
        return "No se pueden generar la cantidad de números solicitados en el rango dado.";
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

function DeleteDashboard() {
    const element = document.getElementById("form");
    element.style.display = "none";
}

function mostrarFlex(id) {
    const element = document.getElementById(id);
    element.style.display = "flex";
}

function validarNombres() {
    const nombres = [];

    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`player${i}`);
        const nombre = input.value.trim();

        if (nombre === '' || nombres.includes(nombre)) {
            return false;
        }

        nombres.push(nombre);
    }

    return true;
}

function number() {
    countRounds++;
    const tablero1 = tableros[0];
    const tablero2 = tableros[1];
    const tablero3 = tableros[2];
    const tablero4 = tableros[3];

    if (
        countRounds < 25 &&
        !verificarCartonLleno(tablero1) &&
        !verificarCartonLleno(tablero2) &&
        !verificarCartonLleno(tablero3) &&
        !verificarCartonLleno(tablero4)
    ) {
        let num = randomUniqueNumbers[arrayindex];
        arrayindex++;
        const element = document.getElementById("random_number");
        element.innerHTML = num;
        changeCell(num);
    } else {
        verificarPuntos();
    }
}

function changeCell(aleatorio) {
    const cell = document.querySelectorAll(".board-cell");

    cell.forEach((cell) => {
        let number = cell.innerHTML;

        if (number == aleatorio) {
            cell.style.backgroundColor = "red";
        }
    });

    for (let i = 0; i < tableros.length; i++) {
        if (i == 0) {
            const posicion = encontrarPosicion(tableros[0], aleatorio);
            if (posicion != -1) {
                tableros[0][posicion["fila"]][posicion["columna"]] = "x";
            }
        } else if (i == 1) {
            const posicion = encontrarPosicion(tableros[1], aleatorio);
            if (posicion != -1) {
                tableros[1][posicion["fila"]][posicion["columna"]] = "x";
            }
        } else if (i == 2) {
            const posicion = encontrarPosicion(tableros[2], aleatorio);
            if (posicion != -1) {
                tableros[2][posicion["fila"]][posicion["columna"]] = "x";
            }
        } else {
            const posicion = encontrarPosicion(tableros[3], aleatorio);
            if (posicion != -1) {
                tableros[3][posicion["fila"]][posicion["columna"]] = "x";
            }
        }
    }
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

function verificarCartonLleno(matriz) {
    const n = matriz.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matriz[i][j] !== "x") {
                return false;
            }
        }
    }

    return true;
}

function verificarPuntos() {
    let puntos = [];

    for (let i = 0; i < 4; i++) {
        const tablero = tableros[i];
        let puntosJugador = calcularPuntos(tablero);
        puntos.push(puntosJugador);

        const jugadorPuntos = document.createElement('li');
        jugadorPuntos.innerHTML = `${document.getElementById(`player${i+1}`).value}: ${puntosJugador}`;
        const lista = document.getElementById("List");
        lista.appendChild(jugadorPuntos);
    }

    localStorage.setItem('Puntos', JSON.stringify(puntos));
}

function calcularPuntos(tablero) {
    let puntos = 0;

    if (verificarCartonLleno(tablero)) {
        puntos += 5;
    }

    if (verificarDiagonalPrincipal(tablero)) {
        puntos += 3;
    }

    if (verificarDiagonalSecundaria(tablero)) {
        puntos += 3;
    }

    puntos += filasColumnasConX(tablero);

    return puntos;
}

function verificarDiagonalPrincipal(matriz) {
    const n = matriz.length;

    for (let i = 0; i < n; i++) {
        if (matriz[i][i] !== "x") {
            return false;
        }
    }

    return true;
}

function verificarDiagonalSecundaria(matriz) {
    const n = matriz.length;

    for (let i = 0; i < n; i++) {
        if (matriz[i][n - 1 - i] !== "x") {
            return false;
        }
    }

    return true;
}

function filasColumnasConX(matriz) {
    let contador = 0;

    for (let i = 0; i < matriz.length; i++) {
        if (filaLlena(matriz[i])) {
            contador++;
        }

        let columna = [];
        for (let j = 0; j < matriz.length; j++) {
            columna.push(matriz[j][i]);

            if (filaLlena(columna)) {
                contador++;
            }
        }

        return contador;
    }

    function filaLlena(fila) {
        return fila.every((cell) => cell === 'x');
    }

    function showDashboard() {
        countRounds = 0;
        const elementsToHide = ["Tables", "scores", "victories"];
        elementsToHide.forEach(id => {
            const element = document.getElementById(id);
            element.style.display = "none";
        });

        const form = document.getElementById("form");
        form.style.display = "flex";
    }

    function mostrarVictorias() {
        const element = document.getElementById("victories");
        element.style.display = "flex";

        const form = document.getElementById("form");
        form.style.display = "none";

        const lista = document.getElementById("List");
        lista.innerHTML = '';

        for (let i = 0; i < localStorage.length; i++) {
            const playerName = localStorage.key(i);
            const points = localStorage.getItem(playerName);
            const listItem = document.createElement("li");
            listItem.textContent = `${playerName}: ${points}`;
            lista.appendChild(listItem);
        }
    }

// Función principal para iniciar el juego
    function iniciarJuego() {
        mostrarDashboard();
    }

// Agregar eventos a los botones
    document.getElementById("btn-3x3").addEventListener("click", function () {
        generateBoard(3);
    });

    document.getElementById("btn-4x4").addEventListener("click", function () {
        generateBoard(4);
    });

    document.getElementById("btn-5x5").addEventListener("click", function () {
        generateBoard(5);
    });

    document.getElementById("scoreButton").addEventListener("click", function () {
        mostrarVictorias();
    });

    document.getElementById("backButton").addEventListener("click", function () {
        showDashboard();
    });

    document.getElementById("startButton").addEventListener("click", function () {
        iniciarJuego();
    });

    document.getElementById("nextNumber").addEventListener("click", function () {
        number();
    });

    document.getElementById("restartButton").addEventListener("click", function () {
        showDashboard();
    });

    document.getElementById("restartButton").addEventListener("click", function () {
        showDashboard();
    });

    function mostrarDashboard() {
        const elementsToHide = ["form"];
        elementsToHide.forEach(id => {
            const element = document.getElementById(id);
            element.style.display = "none";
        });

        const element = document.getElementById("Tables");
        element.style.display = "flex";
    }

    function showDashboard() {
        countRounds = 0;
        const elementsToHide = ["Tables", "scores", "victories"];
        elementsToHide.forEach(id => {
            const element = document.getElementById(id);
            element.style.display = "none";
        });

        const form = document.getElementById("form");
        form.style.display = "flex";
    }

    function mostrarVictorias() {
        const element = document.getElementById("victories");
        element.style.display = "flex";

        const form = document.getElementById("form");
        form.style.display = "none";

        const lista = document.getElementById("List");
        lista.innerHTML = '';

        for (let i = 0; i < localStorage.length; i++) {
            const playerName = localStorage.key(i);
            const points = localStorage.getItem(playerName);
            const listItem = document.createElement("li");
            listItem.textContent = `${playerName}: ${points}`;
            lista.appendChild(listItem);
        }
    }

}


