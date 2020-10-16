let fs = require("fs");

// initial state of promise is pending => fullfull or reject
// javascript => callbacks => promises => async tasks

// chaining
    
let pendingPromise =  fs.promises.readFile("./f1.txt");
console.log(pendingPromise);


 // succeess callback
pendingPromise.then(function (data){
    console.log("Content " + data);
})


 //failed callback
pendingPromise.catch( function(err){
     console.log(err);
 })








 