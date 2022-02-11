// global variables
let container = document.querySelector(".container");
let clear = document.querySelector(".clear");
let eraser = document.querySelector(".eraser");
let color = document.getElementById("favcolor");
let rainbow = document.querySelector(".rainbow");
let colorMode = document.querySelector(".colorMode");
let state = "C";
let penColor = "#000000";

// creates the n by n canvas for drawing
function createDisplay(size) {
  // calculates the size of the canvas dynamically
  let percentage = 100 / size;
  let s = "repeat(" + size + "," + percentage + "%)";

  container.setAttribute(
    "style",
    "grid-template-columns: " + s + "; grid-template-columns: " + s + ";"
  );
  container.style.gridTemplateRows = s;
  console.log("repeat(" + size + "," + percentage + "%)");

  // creates each pixel for the canvas
  for (let i = 0; i < size * size; i++) {
    let el = document.createElement("div");
    el.classList.add("cell");
    el.classList.add("cell-" + i);
    container.append(el);
  }
}

createDisplay(16);

// Adds event listeners to each pixel
let cellArray = document.querySelectorAll(".cell");
console.log(cellArray);
cellArray.forEach((element) => {
  element.addEventListener("mousedown", () => {
    element.style.backgroundColor = getColor(state);
    container.classList.add("dragging");
  });

  element.addEventListener("mouseup", () => {
    container.classList.remove("dragging");
  });

  element.addEventListener("mouseover", () => {
    if (container.classList.contains("dragging")) {
      element.style.backgroundColor = getColor(state);
    }
  });
});

// Adding event listners to the buttons
clear.addEventListener("click", () => {
  cellArray.forEach((element) => {
    element.style.backgroundColor = "white";
  });
});

eraser.addEventListener("click", () => {
  state = "C";
  penColor = "white";
  rainbow.classList.remove("active");
  colorMode.classList.remove("active");
  eraser.classList.add("active");
  color.value = "white";
});

color.addEventListener("change", () => {
  penColor = color.value;
  console.log(penColor);
});

rainbow.addEventListener("click", () => {
  state = "R";
  rainbow.classList.add("active");
  colorMode.classList.remove("active");
  eraser.classList.remove("active");
});

colorMode.addEventListener("click", () => {
  state = "C";
  colorMode.classList.add("active");
  rainbow.classList.remove("active");
  eraser.classList.remove("active");
  penColor = "black";
});

function getColor(s) {
  if (s == "C") {
    return penColor;
  } else {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    penColor = "#" + randomColor;
    color.value = penColor;
    return penColor;
  }
}
