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


// create a user => details aayengi req.body
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
        // promise
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
app.post("/user" , async function(req,res){
    try{
        let uid = uuidv4();
        let newUser = req.body;
        newUser.uid = uid;
        console.log(newUser);
        let data =  await createUser(newUser); //pending promise => resolve
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

// get all userDB
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

// get by id
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

// update by id
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

// delete by id
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



//requests=>SEND REQUEST , ACCEPT REQUEST , SEE PENDING REQUEST , GET FOLLOWING , GET COUNT OF FOLLOWING , GET FOLLOWERS , GET COUNT OF FOLLOWERS

function addInFollowingTable( isPublic , uid , followId){
    return new Promise(  (resolve , reject)=>{
        let sql = `INSERT INTO user_following(uid , follow_id , is_accepted ) VALUES ( "${uid}" , "${followId}" , ${isPublic} )`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    });
}


function addInFollowerTable(uid , followerId){
    return new Promise(  (resolve , reject)=>{
        let sql = `INSERT INTO user_follower(uid , follower_id) VALUES ( "${uid}" , "${followerId}" )`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    });
}




app.post("/user/request" ,async function(req , res){
    try{
        // object destructuring
        let { uid , follow_id } = req.body;
        let user = await getUserById(follow_id);
        let isPublic = user[0].is_public;
        // falsy values => undefined , 0 , false , null , ""
        if(isPublic){
           let followingData = await addInFollowingTable( true , uid , follow_id);
           let followerData = await addInFollowerTable(follow_id , uid );
           res.json({
               message:"Request Sent and accepted !!",
               data : {followerData , followingData}
           })
        }
        else{
            let data = await addInFollowingTable( false , uid  , follow_id);
            res.json({
                message:"Request sent and pending !!!",
                data : data
            })
        }
    }
    catch(error){
        res.json({
            message:"Failed to send request",
            error : error
        })
    }
})






app.listen(3000 , function(){
    console.log("server is listening at 3000 port !!");
})