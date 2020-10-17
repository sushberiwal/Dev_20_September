// let headingDynamic = document.createElement("h1");
// // <h1> </h1>
// console.log(headingDynamic);
// headingDynamic.innerHTML = "hii i am dynamic heading ";
// document.body.appendChild(headingDynamic);

let addTask = document.querySelector(".addTask"); // button
let task = document.querySelector("#task"); //input
let todoList = document.querySelector(".todo-list"); // ul

addTask.addEventListener( "click" , function(){

    let value = task.value;
    // console.log(value);
    task.value = "";

    // falsy values => undefined , "" , false , 0  
    if(value){
        let li = document.createElement("li");
        li.innerHTML = value;
        todoList.appendChild(li);
    }

});

