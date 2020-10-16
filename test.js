let fs = require("fs");

let files = ["./f1.txt" , "./f2.txt" ,"./f3.txt"];


let fileP = fs.promises.readFile(files[0]);

fileP.then(function(data){
    console.log("Content " + data);
    let filesPromise = [];
    for(let i=1 ; i<files.length ; i++){
        let fileP = fs.promises.readFile(files[i]);
        filesPromise.push(fileP);
    }
    return Promise.all(filesPromise);
    
})
.then(function(files){
    console.log(files);
})
