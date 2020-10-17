const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // contex object which have functions to draw on canvas 

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;    
})

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

    let isPenDown = false;
    canvas.addEventListener("mousedown" , function(e){
        isPenDown = true;
        let x = e.clientX;
        let y = e.clientY;
        ctx.beginPath();
        ctx.moveTo(x,y);
    })
    canvas.addEventListener("mousemove" , function(e){
        if(isPenDown){
            let x = e.clientX;
            let y = e.clientY;
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    })
    canvas.addEventListener("mouseup" , function(e){
        isPenDown  = false;
    })