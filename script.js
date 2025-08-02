const gridDiv = document.querySelector(".grid-container");

let gridSize = gridDiv.clientWidth;
let cellsPerSide = 16;

const normalBtn = document.querySelector("#normal-btn");
const randBtn = document.querySelector("#random-btn");
const progBtn = document.querySelector("#prog-dark-btn");

const drawBtn = document.querySelector("#draw");
const eraseBtn = document.querySelector("#erase");
const moveBtn = document.querySelector("#move");

// 0 -> move around
// 1 -> draw
// -1 -> erase
let inputType = 0;

moveBtn.addEventListener("click", () => {
    inputType = 0;
});
drawBtn.addEventListener("click", () => {
    inputType = 1;
});
eraseBtn.addEventListener("click", () => {
    inputType = -1;
});

document.addEventListener("keypress", (e) => {
    switch(e.key) {
        case "d":
            drawBtn.click();
            break;
        case "e":
            eraseBtn.click();
            break;
        case "m":
            moveBtn.click();
            break;
        case "i":
            inverseBtn.click();
            break;
        case "r":
            refreshBtn.click();
            break;
    }
});
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Control":
            drawBtn.click();
            break;
        case "Shift":
            eraseBtn.click();
            break;
        default:
            break;
    }
});
document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "Control":
        case "Shift":
            moveBtn.click();
            break;
        default:
            break;
    }
});

let currentFunction;
if (normalBtn.checked) {
    currentFunction = normalFill;
} else if (randBtn.checked) {
    currentFunction = randomFill;
} else if (progBtn.checked) {
    currentFunction = progressiveFill;
};

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

const inverseBtn = document.querySelector("#inverse-btn");
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

normalBtn.addEventListener ("click", () => {
    currentFunction = normalFill;
    resetGrid(cellsPerSide);
});

function normalFill (e) {
    if (inputType == 1) {
        e.target.classList.add("normal-fill");
    } else if (inputType == -1) {
        e.target.classList.remove("normal-fill");
    }
}

randBtn.addEventListener ("click", () => {
    currentFunction = randomFill;
    resetGrid(cellsPerSide);
});

function randomFill (e) {
    if (inputType == 1) {
        let randomRed = getRandomInt(255);
        let randomGreen = getRandomInt(255);
        let randomBlue = getRandomInt(255);

        e.target.style.backgroundColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`;
        e.target.style.color = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`;
    } else if (inputType == -1) {
        e.target.style.backgroundColor = "";
        e.target.style.color = window.getComputedStyle(document.documentElement).getPropertyValue("--color-one");
    }
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
    if (inputType == 1) {
        for (let index = 0; index < progressiveClasses.length; index++) {
            if (!e.target.classList.contains(progressiveClasses[index])) {
                e.target.classList.add(progressiveClasses[index]);
                break;
            }
        }
    } else if (inputType == -1) {
        for (let index = progressiveClasses.length - 1; index >= 0; index--) {
            if (e.target.classList.contains(progressiveClasses[index])) {
                e.target.classList.remove(progressiveClasses[index]);
                break;
            }
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

        cell.addEventListener("mouseover", currentFunction);

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

const dialog = document.querySelector("dialog");
dialog.addEventListener("click",(e) => {
    if (e.target === dialog) {
        dialog.close();
    }
});
dialog.showModal();

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
    dialog.close();
});
