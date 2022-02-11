// global variables
let container = document.querySelector(".container");
let penColor = "#ff00ff";

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
    el.setAttribute("draggable", false);
    container.append(el);
  }
}

createDisplay(32);

// Adds event listeners to each pixel
let cellArray = document.querySelectorAll(".cell");
console.log(cellArray);
cellArray.forEach((element) => {
  element.addEventListener("mousedown", () => {
    element.style.backgroundColor = penColor;
    container.classList.add("dragging");
  });

  element.addEventListener("mouseup", () => {
    container.classList.remove("dragging");
  });

  element.addEventListener("mouseover", () => {
    if (container.classList.contains("dragging")) {
      element.style.backgroundColor = penColor;
    }
  });
});
