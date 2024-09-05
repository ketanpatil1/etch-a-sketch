const gridDiv = document.querySelector(".grid-container");

let gridSize = gridDiv.clientWidth;
let cellsPerSide = 16;
let currentFunction = normalFill;

let fillColor = "rgba(119, 165, 255, 1)";

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
                removeGrid();
                createGrid(cellsPerSide);
            }
        }
    });
}

const refreshBtn = document.querySelector("#refresh-btn");
refreshBtn.addEventListener("click", () => {
    removeGrid();
    createGrid(cellsPerSide);
    for (input of inputs) {
        input.value = cellsPerSide;
    }
});

const normalBtn = document.querySelector("#normal-btn");
const randBtn = document.querySelector("#random-btn");
const progBtn = document.querySelector("#prog-dark-btn");

normalBtn.addEventListener ("click", () => {
    normalBtn.classList.add("active");
    randBtn.classList.remove("active");
    progBtn.classList.remove("active");

    currentFunction = normalFill;
    removeGrid();
    createGrid(cellsPerSide);
});

function normalFill (e) {
    e.target.style.backgroundColor = fillColor;
    e.target.removeEventListener("mouseover", normalFill);
}

randBtn.addEventListener ("click", () => {
    normalBtn.classList.remove("active");
    randBtn.classList.add("active");
    progBtn.classList.remove("active");

    currentFunction = randomFill;
    removeGrid();
    createGrid(cellsPerSide);
});

function randomFill (e) {
    let randomRed = getRandomInt(255);
    let randomGreen = getRandomInt(255);
    let randomBlue = getRandomInt(255);

    e.target.style.backgroundColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`;
    e.target.removeEventListener("mouseover", randomFill);
}

progBtn.addEventListener ("click", () => {
    normalBtn.classList.remove("active");
    randBtn.classList.remove("active");
    progBtn.classList.add("active");

    currentFunction = progressiveFill;
    removeGrid();
    createGrid(cellsPerSide);
});

function progressiveFill (e) {
    let oldColor = window.getComputedStyle(e.target).backgroundColor;
    if (oldColor.match(/\s\d\)$/)) {
        e.target.style.backgroundColor = fillColor.replace("1)", "0.1)");
    } else {
        let opacityMatch = oldColor.match(/\d.\d(?=\)$)/);
        if (opacityMatch) {
            let opacity = Number(opacityMatch[0]);
            e.target.style.backgroundColor = oldColor.replace(/\d.\d(?=\)$)/, `${opacity + 0.2}`);
        } else {
            e.target.removeEventListener("mouseover", progressiveFill);
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
}

function removeGrid() {
    while(gridDiv.firstChild) {
        gridDiv.removeChild(gridDiv.firstChild);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
