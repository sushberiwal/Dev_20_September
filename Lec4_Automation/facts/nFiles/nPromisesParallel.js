let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

for(let i=0 ; i<files.length ; i++){
    let filePromise = fs.promises.readFile(files[i]);
    filePromise.then(function(data){
        console.log("Content " + data);
    })
    filePromise.catch(function(err){
        console.log(err);
    })
}