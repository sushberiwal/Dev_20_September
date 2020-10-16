let fs = require("fs");

let f1KaPromise = fs.promises.readFile("./f1.txt");


f1KaPromise.then(function(data){
    console.log("Content " + data);
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    f2KaPromise.then(function(data){
        console.log("Content"  + data);
        let f3KaPromise = fs.promises.readFile("./f3.txt");
        f3KaPromise.then(function(data){
            console.log("Content" + data);
        })
        f3KaPromise.catch(function(err){
            console.log(err);
        })
    });
    f2KaPromise.catch(function(err){
        console.log(err);
    })
});

f1KaPromise.catch(function(err){
    console.log(err);
});