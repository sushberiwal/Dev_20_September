let fs = require("fs");

// pending promise 
function createPromise(path){
    return new Promise( function(resolve , reject){

        fs.readFile(path , function(error , data){
            if(error == null){
                resolve(data);
            }
            else{
                reject(error);
            }
        })
        
    }  );
}



let pendingPromise =  createPromise("./f11.txt");

// succeess callback
pendingPromise.then(function (data){
    console.log("Content " + data);
})

//failed callback
pendingPromise.catch( function(err){
     console.log(err);
 })








 