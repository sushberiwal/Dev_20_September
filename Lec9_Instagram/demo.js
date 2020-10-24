// npm init -y
// npm install express
// npm install nodemon
//npm install uuid
// create server

const express = require("express");
const userDB = require("./db/users.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const connection = require("./db/connection");





// express => to create server easily

// server is creeated
const app = express();

// if you want to see data in req.body
app.use(express.json());




// CRUD => create read update delete => user


// create a user => details aayengi req.body
app.post("/user" , function(req,res){
    let uid = uuidv4();
    let newUser = req.body;
    newUser.uid = uid;
    userDB.push(newUser);
    fs.writeFileSync("./db/users.json" , JSON.stringify(userDB));
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
app.patch("/user/:uid" , function(req,res){

    let uid = req.params.uid;
    let updateObject = req.body;

    let userToBeUpdated = userDB.filter(function(user){
        return user.uid == uid;
    })

    for(key in updateObject){
        userToBeUpdated[0][key] = updateObject[key];
    }
    fs.writeFileSync("./db/users.json" , JSON.stringify(userDB));
    res.json({
        message:"User updated succesfully",
        data : userToBeUpdated[0]
    })
})
// delete by id
app.delete("/user/:uid" , function(req,res){ 
    let uid = req.params.uid;
    let userToBeDeleted = userDB.filter( function(user){
        return user.uid == uid;
    });
    let filteredUsers = userDB.filter( function(user){
        return user.uid != uid;
    });
    if(filteredUsers.length == userDB.length){
        res.json({
            message:"user not found !!"
        })
    }
    else{
        fs.writeFileSync("./db/users.json" , JSON.stringify(filteredUsers));
        res.json({
            message:"User deleted Succesfully",
            data : userToBeDeleted[0]
        })
    }

})





app.listen(3000 , function(){
    console.log("server is listening at 3000 port !!");
})