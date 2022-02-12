// global variables
let container = document.querySelector(".container");
let clear = document.querySelector(".clear");
let eraser = document.querySelector(".eraser");
let color = document.getElementById("favcolor");
let rainbow = document.querySelector(".rainbow");
let colorMode = document.querySelector(".colorMode");
let slider = document.querySelector(".slider");
let dimensions = document.querySelector(".dimensions");
let cellArray;
let state = "C"; //State to keep track of color and rainbow modes
let penColor = "#000000";

// creates the n by n canvas for drawing
function createDisplay(size) {
  let percentage = 100 / size; // calculates the size of the canvas
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

  // Adds Events listners to each cell/pixel
  cellArray = document.querySelectorAll(".cell");
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
}

//initial Display
createDisplay(16);

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

slider.addEventListener("change", () => {
  let size = slider.value;
  dimensions.textContent = size + "rows x " + size + " columns";

  // removes all the cells from canvas
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  createDisplay(size);
});

// Random Color Generator
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
