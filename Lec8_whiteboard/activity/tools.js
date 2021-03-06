let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let pencilInput = document.querySelector("#pencil-size");
let eraserInput = document.querySelector("#eraser-size");
let colors = document.querySelectorAll(".tool-color div");



let pencilSize = 1;
let eraserSize = 1;

pencilInput.addEventListener("change", function () {
  let value = pencilInput.value;
  pencilSize = value;
});

eraserInput.addEventListener("change", function () {
  let value = eraserInput.value;
  eraserSize = value;
});

for (let i = 0; i < colors.length; i++) {
  let color = colors[i];
  color.addEventListener("click" , function(){
      let className = color.classList.value;
      ctx.strokeStyle = className;
  })
}

let activeTool = "pencil";
pencil.addEventListener("click", function () {
  ctx.lineWidth = pencilSize;

  // eraser se active tool hat jae
  if (activeTool == "pencil") {
    if (pencilOptions.classList.contains("active-tool-options")) {
      pencilOptions.classList.remove("active-tool-options");
    } else {
      pencilOptions.classList.add("active-tool-options");
    }
  } else {
    eraser.classList.remove("active-tool");
    eraserOptions.classList.remove("active-tool-options");
    pencil.classList.add("active-tool");
    ctx.strokeStyle = "black";
    activeTool = "pencil";
  }
  // pencil pe active tool add hojae
});

eraser.addEventListener("click", function () {
  ctx.lineWidth = eraserSize;

  if (activeTool == "eraser") {
    if (eraserOptions.classList.contains("active-tool-options")) {
      eraserOptions.classList.remove("active-tool-options");
    } else {
      eraserOptions.classList.add("active-tool-options");
    }
  } else {
    pencil.classList.remove("active-tool");
    pencilOptions.classList.remove("active-tool-options");
    eraser.classList.add("active-tool");
    ctx.strokeStyle = "white";
    activeTool = "eraser";
  }
});

undo.addEventListener("click", function () {
  // console.log(points);
  removeLine();
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // redraw function
  redraw();
});

redo.addEventListener("click", function () {
  // redoPoints.pop();
  if (redoPoints.length) {
    let lineToBeDrawn = redoPoints.pop();
    // line push to points
    points.push(lineToBeDrawn);
    // redraw last line in points
    for (let i = 0; i < lineToBeDrawn.length; i++) {
      ctx.strokeStyle = lineToBeDrawn[i].penColor;
      ctx.lineWidth = lineToBeDrawn[i].penWidth;
      if (lineToBeDrawn[i].id == "md") {
        ctx.beginPath();
        ctx.moveTo(lineToBeDrawn[i].x, lineToBeDrawn[i].y);
      } else {
        ctx.lineTo(lineToBeDrawn[i].x, lineToBeDrawn[i].y);
        ctx.stroke();
      }
    }
  }
});

function removeLine() {
  if (points.length) {
    redoPoints.push(points.pop());
  }
}

function redraw() {
  // console.log("inside redraw");
  // console.log(points);
  // black => ctx.strokeStyle;

  for (let i = 0; i < points.length; i++) {
    let line = points[i];

    for (let j = 0; j < line.length; j++) {
      ctx.strokeStyle = line[j].penColor;
      ctx.lineWidth = line[j].penWidth;
      if (line[j].id == "md") {
        ctx.beginPath();
        ctx.moveTo(line[j].x, line[j].y);
      } else if (line[j].id == "mm") {
        ctx.lineTo(line[j].x, line[j].y);
        ctx.stroke();
      }
    }
  }
}
