const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); // contex object which have functions to draw on canvas

canvas.height = window.innerHeight-80;
canvas.width = window.innerWidth;

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight-80;
  canvas.width = window.innerWidth;
});

//ctx.fillStyle = 'green';
//x-axis , y-axis , length , breadth
//ctx.fillRect(10, 10, 150, 100);
//draw a line
// ctx.strokeStyle = "red";
// ctx.lineWidth = 5;
// ctx.beginPath();
// ctx.moveTo(30,30);
// ctx.lineTo(400,10);
// ctx.lineTo(100,50);
// ctx.stroke();
let points = [];
let isPenDown = false;
let line = [];

canvas.addEventListener("mousedown", function (e) {
  isPenDown = true;
  let { top } = canvas.getBoundingClientRect();
  let x = e.clientX;
  let y = e.clientY - top;
  ctx.beginPath();
  ctx.moveTo(x, y);
  let point = {
      id : "md",
      x : x,
      y : y
  }
  line.push(point);
});
canvas.addEventListener("mousemove", function (e) {
  if (isPenDown) {
    let { top } = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    ctx.lineTo(x, y);
    ctx.stroke();
    let point = {
        id : "mm",
        x : x,
        y : y
    }
    line.push(point);
  }
});

canvas.addEventListener("mouseup", function (e) {
  isPenDown = false;
  points.push(line);
  line = []; // new 

});
