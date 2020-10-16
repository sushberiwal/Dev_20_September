let elements = ["A1" , "A2" ,"B2" , "Z2"];

let name = "B2";

let filteredElements = elements.filter(function(elem){
    return elem != name;
})

console.log(filteredElements);