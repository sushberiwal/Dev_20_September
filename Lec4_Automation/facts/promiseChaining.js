let fs = require("fs");

// hell
// then bhi pending promise deta

let f1KaPromise = fs.promises.readFile("./f1.txt");

f1KaPromise.then(function(data){
    console.log("Content" + data);
})
.then(function(){
  let f2KaPromise = fs.promises.readFile("./f2.txt");
  return f2KaPromise; 
})
.then(function(data){
    console.log("Content" + data);
})





// f1KaPromise.catch(function(err){
//     console.log(err);
// })