// this , super , constructor

class Human{
    
    constructor(name , age , gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    //properties and methods
    sayHi(){
        console.log("inside say Hi");
        console.log(this);
        console.log(`${this.name} Says Hi  ${value} !!!!`);
    }
}



class SuperHuman extends Human{
    constructor(name , age , gender , ability){
        super(name , age , gender);  // calls the constructor of extended class
        this.ability = ability;
    }

    sayHi(){
        console.log(this);
        console.log(`${this.name} says Hi`);
    }
}

// this is defined on runtime
// this cannot be set
// this refers to the calling object

let tony = new Human("tony" , "22" , "m");
// tony.sayHi();

let steve = new Human("steve" , "20" , "m");
// steve.sayHi();

let hulk = new SuperHuman( "hulk" , "23" , "m" ,"smash");

hulk.sayHi();

