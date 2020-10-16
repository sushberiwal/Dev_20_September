let fs = require("fs");


console.log("Before");

// stack block
let data = fs.readFileSync("./f1.txt" , "utf-8");  // 100gb
console.log("Content of F1 " + data);


console.log("After");

