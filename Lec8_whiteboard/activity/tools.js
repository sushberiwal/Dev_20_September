let undo = document.querySelector("#undo");


undo.addEventListener("click" , function(){
    // console.log(points);
    removeLine();
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // redraw function 
    redraw();
})


function removeLine(){
    if(points.length){
        points.pop();
    }
}

function redraw(){
    // console.log("inside redraw");
    // console.log(points);
    for(let i=0 ; i<points.length ; i++){
        let line = points[i];
        // console.log("line" , line);
        for(let j=0 ; j<line.length ; j++){
            console.log(line[j]);
            if(line[j].id == "md"){
                ctx.beginPath();
                ctx.moveTo(line[j].x , line[j].y);
            }
            else if(line[j].id == "mm"){
                ctx.lineTo(line[j].x , line[j].y);
                ctx.stroke();
            }
        }
    }
}
