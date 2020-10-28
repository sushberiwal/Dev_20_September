
// without let ya const
// name ="hulk";


let obj = {
    name : "Steve",
    sayHi : function(){
        console.log("Inside sayHi");
        console.log(this); 
        // console.log(this.name +" says Hii !");
        fun = () => {
            console.log("Inside fun");
            console.log(this);
        }
        // bind => function's this defined lexical scope ke hisab se
        fun();
    }
}


// method call via object;
// obj.sayHi();
// arrow functions

outer = () => {
   console.log(this);
}
outer();


function fun(){
    console.log(this);
}
fun();




// simple function call => this will be global object
// method call => this will be the current object

// ek global object maintain hota hai
// browser ek window object maintain hota hai