let fs = require("fs");

let f1KaPromise = fs.promises.readFile("./f1.txt");
let f2KaPromise = fs.promises.readFile("./f2.txt");
let f3KaPromise = fs.promises.readFile("./f3.txt");

f1KaPromise.then(scb);
f1KaPromise.catch(fcb);
f2KaPromise.then(scb);
f2KaPromise.catch(fcb);
f3KaPromise.then(scb);
f3KaPromise.catch(fcb);


function scb(data){
    console.log("Content " + data);
}

function fcb(err){
    console.log(err);
}




