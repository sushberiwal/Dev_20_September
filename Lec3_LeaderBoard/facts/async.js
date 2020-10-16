let fs = require("fs");


console.log("Before");


fs.readFile("./f1.txt" , fun);

function fun(error , data){
    console.log("Content of F1 " + data );
}



