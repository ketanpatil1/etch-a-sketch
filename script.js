const gridDiv = document.querySelector(".grid-container");

let gridSize = gridDiv.clientWidth;
let cellsPerSide = 16;
let currentFunction = normalFill;

createGrid(cellsPerSide);

const inputs = document.querySelectorAll("input");
for (input of inputs) {
    input.value = cellsPerSide;

    input.addEventListener ("keypress", (e) => {
        if (e.key === "Enter") {
            if (e.target.value <= 64 && e.target.value >= 1) {
                cellsPerSide = e.target.value;
            } else if (e.target.value > 64) {
                cellsPerSide = 64;
            } else {
                cellsPerSide = 2;
            }

            for (input of inputs) {
                input.value = cellsPerSide;
            }

            if (cellsPerSide > 0) {
                resetGrid(cellsPerSide);
            }
        }
    });
}

const refreshBtn = document.querySelector("#refresh-btn");
refreshBtn.addEventListener("click", () => {
    refreshBtn.classList.add("rotating");
    setTimeout(() => {
        refreshBtn.classList.remove("rotating");
    }, 500);
    resetGrid(cellsPerSide);
    for (input of inputs) {
        input.value = cellsPerSide;
    }
});

const normalBtn = document.querySelector("#normal-btn");
const randBtn = document.querySelector("#random-btn");
const progBtn = document.querySelector("#prog-dark-btn");

normalBtn.addEventListener ("click", () => {
    currentFunction = normalFill;
    resetGrid(cellsPerSide);
});

function normalFill (e) {
    e.target.classList.toggle("normal-fill");
    e.target.removeEventListener("mouseover", normalFill);
}

randBtn.addEventListener ("click", () => {
    currentFunction = randomFill;
    resetGrid(cellsPerSide);
});

function randomFill (e) {
    let randomRed = getRandomInt(255);
    let randomGreen = getRandomInt(255);
    let randomBlue = getRandomInt(255);

    e.target.style.backgroundColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`;
    e.target.style.color = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`;
    e.target.removeEventListener("mouseover", randomFill);
}

progBtn.addEventListener ("click", () => {
    currentFunction = progressiveFill;
    resetGrid(cellsPerSide);
});

const progressiveClasses = [
    "progressive-one",
    "progressive-two",
    "progressive-three",
    "progressive-four",
    "progressive-five"
];
function progressiveFill (e) {
    for (let index = 0; index < progressiveClasses.length; index++) {
        if (!e.target.classList.contains(progressiveClasses[index])) {
            e.target.classList.add(progressiveClasses[index]);
            break;
        }
    }
}

function createGrid(cellsPerSide) {
    let cellSize = 80 / cellsPerSide;
    for (let i = 0; i < cellsPerSide**2; i++) {
        const cell = document.createElement("div");
        cell.style.height = `${cellSize}vh`;
        cell.style.width = `${cellSize}vh`;
        cell.classList.add("cell");
        cell.id = i+1;

        cell.addEventListener ("mouseover", currentFunction);

        gridDiv.appendChild(cell);
    }
    gridDiv.classList.remove("removed");
    gridDiv.classList.add("created");
}

function removeGrid() {
    while(gridDiv.firstChild) {
        gridDiv.removeChild(gridDiv.firstChild);
    }
}

function resetGrid(cellsPerSide) {
    gridDiv.classList.remove("created");
    gridDiv.classList.add("removed");
    setTimeout(() => {
        removeGrid();
        createGrid(cellsPerSide);
    }, 300);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
