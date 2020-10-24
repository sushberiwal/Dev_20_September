// npm init -y
// npm install express
// npm install nodemon
//npm install uuid
// create server

const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const connection = require("./db/connection");





// express => to create server easily

// server is creeated
const app = express();

// if you want to see data in req.body
app.use(express.json());



function createUser(newUser){
    return new Promise(  (resolve , reject) =>{
        // insert details in table
        let uid = newUser.uid;
        let name = newUser.name;
        let handle = newUser.handle;
        let email = newUser.email;
        let bio = newUser.bio;
        let phone = newUser.phone;
        let isPublic = newUser.isPublic;
        // console.log(uid , name , handle , email , bio , phone , isPublic);
        let sql = `INSERT INTO user_table(uid , name , handle , email , bio , phone , is_public) VALUES ( "${uid}" , "${name}" , "${handle}" , "${email}" , "${bio}" ,"${phone}" , ${isPublic}  )`;
        connection.query( sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
// create a user => details aayengi req.body
app.post("/user" , async function(req,res){
    try{
        let uid = uuidv4();
        let newUser = req.body;
        newUser.uid = uid;
        console.log(newUser);
        let data =  await createUser(newUser);
        res.json({
            message:"user added succesfully",
            data : data
        })
    }
    catch(err){
        res.json({
            message:"user creation failed !!",
            data : err
        })
    }
})




function getAllUsers(){
    return new Promise( (resolve , reject) =>{
        let sql = `SELECT * FROM user_table`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    }  )
}


// get all userDB
app.get("/user" , async function(req , res){
    try{
        let data = await getAllUsers();
        res.json({
            message:"got all users succesfully",
            users : data
        })
    }
    catch(err){
        res.json({
            message:"get all users failed !!",
            error : err
        })
    } 
});





function getUserById(uid){
    return new Promise( (resolve , reject)=>{
        let sql = `SELECT * FROM user_table WHERE uid = "${uid}" `;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
// get by id
app.get("/user/:uid" , async function(req,res){
try{
    let uid = req.params.uid;
    let data = await getUserById(uid);
    res.json({
        message:"get user by id succesfully",
        user : data[0]
    })
}
catch(err){
    res.json({
        message:"Failed to get by id",
        error : err
    })
}
})




function updateUserById(uid , updateObject){
    return new Promise((resolve , reject)=>{
// UPDATE user_table
// SET 
// name = "" , handle = "" , is_public = "" 
// WHERE uid = "";
      let sql = `UPDATE user_table SET`;
      for(key in updateObject){
          sql+= ` ${key} = "${updateObject[key]}" ,`;
      }
      sql = sql.slice(0 , -1);
      sql += ` WHERE uid = "${uid}"`;
      
      connection.query(sql , function(error , data){
          if(error){
              reject(error);
          }
          else{
              resolve(data);
          }
      })
    })
}


// update by id
app.patch("/user/:uid" , async function(req,res){
    try{
        let uid = req.params.uid;
        let updateObject = req.body;
        let data = await updateUserById(uid , updateObject);
        res.json({
            message:"USer updated succesfully",
            data : data
        })
    }
    catch(err){
        res.json({
            message:"failed to update user",
            error : err
        })
    }
})



function deleteById(uid){
    return new Promise((resolve , reject)=>{
        let sql = `DELETE FROM user_table WHERE uid = "${uid}"`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}

// delete by id
app.delete("/user/:uid" , async function(req,res){ 
    try{
        let uid = req.params.uid;
        let data = await deleteById(uid);
        res.json({
            message:"user deleted succesfully",
            data: data
        })


    }
    catch(err){
        res.json({
            message:"Failed to delete user",
            error : err
        })
    }
})





app.listen(3000 , function(){
    console.log("server is listening at 3000 port !!");
})