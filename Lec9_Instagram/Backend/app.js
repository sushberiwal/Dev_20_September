// npm init -y
// npm install express
// npm install nodemon
//npm install uuid
// create server

const express = require("express");
const users = require("./db/users.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// express => to create server easily

// server is creeated
const app = express();

// if you want to see data in req.body
app.use(express.json());

// create a user => details aayengi req.body
app.post("/user" , function(req,res){
    let uid = uuidv4();
    let newUser = req.body;
    newUser.uid = uid;
    users.push(newUser);
    fs.writeFileSync("./db/users.json" , JSON.stringify(users));
    // send a response 
    res.json({
        message : "Added a user succesfully",
        data : newUser
    })
})

// get all users
app.get("/user" , function(req , res){
    if(users.length){
        res.json({
            message : "all users get succesfully",
            data : users
        })
    }
    else{
        res.json({
            message:"Users not found !!"
        })
    }
});


// get by id





// update by id





// delete by id











app.listen(3000 , function(){
    console.log("server is listening at 3000 port !!");
})