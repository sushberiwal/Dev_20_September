// npm init -y
// npm install express
// npm install nodemon
//npm install uuid
// create server

const express = require("express");
const userDB = require("./db/users.json");
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
    userDB.push(newUser);
    fs.writeFileSync("./db/userDB.json" , JSON.stringify(userDB));
    // send a response 
    res.json({
        message : "Added a user succesfully",
        data : newUser
    })
})

// get all userDB
app.get("/user" , function(req , res){
    if(userDB.length){
        res.json({
            message : "all userDB get succesfully",
            data : userDB
        })
    }
    else{
        res.json({
            message:"userDB not found !!"
        })
    }
});


// get by id
app.get("/user/:uid" , function(req,res){
     let uid = req.params.uid;
     let user = userDB.filter(  function(user){
        return user.uid == uid;
     });
     // [  {}   ]
     if(user.length){
         res.json({
             message:"user found",
             data : user[0]
         })
     }
     else{
         res.json({
             message:"User not found by id"
         })
     }
})




// update by id
app.patch("/user" , function(req,res){


})



// delete by id
app.delete("/user" , function(req,res){


})





app.listen(3000 , function(){
    console.log("server is listening at 3000 port !!");
})