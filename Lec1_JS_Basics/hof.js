// HOF => High Order Functions
// function those take functions as a argument

// callback Functions =>
// functions which are passed as an argument to a function

// callback functions
function getFirstName(fullName){
   // fullname = "Steve Rogers Tony"
   // fullName.split(" ")
   fullName = fullName.split(" ");
   // ["Steve" , "Rogers" , "Tony"];
   return fullName[0];
}
function getLastName(fullName){
 fullName = fullName.split(" ");
 return fullName[fullName.length-1];
}
// printNames => High order functions
function printNames( fullName , fun){
    let name = fun(fullName);
    console.log(name);
}

printNames("Steve Rogers" , getFirstName);
printNames("Tony Stark" , getLastName);




