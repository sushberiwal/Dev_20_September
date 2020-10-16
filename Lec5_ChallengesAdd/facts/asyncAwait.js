let fs = require("fs");
// Async await 
// function ke samne => async keyword => function async bnjata hai => node api will process async functions

// await keyword => function async

// IIFE => Immediately invoked function expression


(async function(){

    try{
        let f1KaData = fs.promises.readFile("./f1.txt");
        let f2KaData = fs.promises.readFile("./f2.txt");
        let bothData = await Promise.all( [f1KaData,f2KaData]);
    }
    catch(err){
        console.log(err);
    }

})();