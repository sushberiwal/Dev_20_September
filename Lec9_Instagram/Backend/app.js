// npm init -y
// npm install express
// npm install nodemon
//npm install uuid
// create server

const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const connection = require("./db/connection");
const cors = require("cors");
// express => to create server easily

// server is creeated
const app = express();

// if you want to see data in req.body
app.use(express.json());


app.use(cors());


// create a user => details aayengi req.body
function createUser(newUser) {
  return new Promise((resolve, reject) => {
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
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
app.post("/user", async function (req, res) {
  try {
    let uid = uuidv4();
    let newUser = req.body;
    newUser.uid = uid;
    console.log(newUser);
    let data = await createUser(newUser); //pending promise => resolve
    res.json({
      message: "user added succesfully",
      data: data,
    });
  } catch (err) {
    res.json({
      message: "user creation failed !!",
      data: err,
    });
  }
});

// get all userDB
function getAllUsers() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM user_table`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
app.get("/user", async function (req, res) {
  try {
    let data = await getAllUsers();
    res.json({
      message: "got all users succesfully",
      users: data,
    });
  } catch (err) {
    res.json({
      message: "get all users failed !!",
      error: err,
    });
  }
});

// get by id
function getUserById(uid) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM user_table WHERE uid = "${uid}" `;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
app.get("/user/:uid", async function (req, res) {
  try {
    let uid = req.params.uid;
    let data = await getUserById(uid);
    res.json({
      message: "get user by id succesfully",
      user: data[0],
    });
  } catch (err) {
    res.json({
      message: "Failed to get by id",
      error: err,
    });
  }
});

// update by id
function updateUserById(uid, updateObject) {
  return new Promise((resolve, reject) => {
    // UPDATE user_table
    // SET
    // name = "" , handle = "" , is_public = ""
    // WHERE uid = "";
    let sql = `UPDATE user_table SET`;
    for (key in updateObject) {
      sql += ` ${key} = "${updateObject[key]}" ,`;
    }
    sql = sql.slice(0, -1);
    sql += ` WHERE uid = "${uid}"`;

    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
app.patch("/user/:uid", async function (req, res) {
  try {
    let uid = req.params.uid;
    let updateObject = req.body;
    let data = await updateUserById(uid, updateObject);
    res.json({
      message: "USer updated succesfully",
      data: data,
    });
  } catch (err) {
    res.json({
      message: "failed to update user",
      error: err,
    });
  }
});

// delete by id
function deleteById(uid) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM user_table WHERE uid = "${uid}"`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
app.delete("/user/:uid", async function (req, res) {
  try {
    let uid = req.params.uid;
    let data = await deleteById(uid);
    res.json({
      message: "user deleted succesfully",
      data: data,
    });
  } catch (err) {
    res.json({
      message: "Failed to delete user",
      error: err,
    });
  }
});

//requests=>SEND REQUEST , ACCEPT REQUEST , CANCEL REQUEST , SEE PENDING REQUEST , GET FOLLOWING , GET COUNT OF FOLLOWING , GET FOLLOWERS , GET COUNT OF FOLLOWERS , UNFOLLOW

// send request
function addInFollowingTable(isPublic, uid, followId) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user_following(uid , follow_id , is_accepted ) VALUES ( "${uid}" , "${followId}" , ${isPublic} )`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function addInFollowerTable(uid, followerId) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user_follower(uid , follower_id) VALUES ( "${uid}" , "${followerId}" )`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
app.post("/user/request", async function (req, res) {
  try {
    // object destructuring
    let { uid, follow_id } = req.body;
    let user = await getUserById(follow_id);
    let isPublic = user[0].is_public;
    // falsy values => undefined , 0 , false , null , ""
    if (isPublic) {
      let followingData = await addInFollowingTable(true, uid, follow_id);
      let followerData = await addInFollowerTable(follow_id, uid);
      res.json({
        message: "Request Sent and accepted !!",
        data: { followerData, followingData },
      });
    } else {
      let data = await addInFollowingTable(false, uid, follow_id);
      res.json({
        message: "Request sent and pending !!!",
        data: data,
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to send request",
      error: error,
    });
  }
});


// accept request
function acceptRequest(followId , uid){
    return new Promise( (resolve , reject)=>{
        let sql = `UPDATE user_following SET is_accepted = true WHERE uid = "${uid}" and follow_id = "${followId}" `;
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
app.post("/user/request/accept",async function (req, res) {
  try {
    let {uid , toBeAccepted } = req.body;
    let acceptdata = await acceptRequest(uid , toBeAccepted);
    let followerData = await addInFollowerTable( uid , toBeAccepted );
    res.json({
        message:"Request Accepted !!",
        data : {acceptdata , followerData}
    })
  } catch (error) {
    res.json({
      message: "Failed to accept request !!",
      error: error,
    });
  }
});


// cancel request
function cancelRequest(uid , followId){
    return new Promise((resolve , reject)=>{
        let sql = `DELETE FROM user_following WHERE uid = "${uid}" AND follow_id = "${followId}"`;
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
app.post("/user/request/cancel" , async function(req , res){
    try{
        let {uid , toBeCancel } = req.body;
        let data = await cancelRequest(uid , toBeCancel);
        res.json({
            message:"follow request cancelled !!",
            data : data
        })
    }
    catch(error){
        res.json({
            message: "Failed to cancel request !!",
            error: error,
          }); 
    }
})

// see pending request
function getPendingIds(followId){
return new Promise((resolve , reject)=>{
    let sql = `SELECT uid FROM user_following WHERE follow_id = "${followId}" AND is_accepted = FALSE`;
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
app.get("/user/request/:uid" , async function(req , res){
    try{
        let {uid} = req.params;
        let pendingIds = await getPendingIds(uid);
        // console.log(pendingIds);
        let pendingRequests = [];
        for(let i=0 ; i<pendingIds.length ; i++){
            let {uid} = pendingIds[i];
            let user = await getUserById(uid);
            pendingRequests.push(user[0]);
        }
        res.json({
            message:"Succesfully got all pending requests !!!",
            data : pendingRequests
        })
    }
    catch(error){
        res.json({
            message:"failed to get all pending request",
            error : error
        })
    }
})


// unfollow
function removeFromFollowing(uid , followId){
    return new Promise((resolve , reject)=>{
        let sql = `DELETE FROM user_following WHERE uid = "${uid}" AND follow_id="${followId}"`;
        connection.query(sql ,function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
function removeFromFollower(uid , followerId){
    return new Promise((resolve , reject)=>{
        let sql = `DELETE FROM user_follower WHERE uid = "${uid}" AND follower_id="${followerId}"`;
        connection.query(sql ,function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
app.post("/user/request/unfollow", async function (req, res) {
    try {
      // object destructuring
      let { uid, follow_id } = req.body;
      let followingData = await removeFromFollowing(uid , follow_id);
      let followerData =  await removeFromFollower(follow_id , uid);
      res.json({
          message:"removed following succesfully",
          data : {followerData , followingData}
      })
    } catch (error) {
      res.json({
        message: "Failed to unfollow",
        error: error,
      });
    }
  });

  
// get following
function getFollowingIds(uid){
    return new Promise((resolve , reject)=>{
        let sql = `SELECT follow_id FROM user_following WHERE uid = "${uid}" AND is_accepted = true`;
        connection.query(sql , function(error ,data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
app.get("/user/following/:uid" , async function(req , res){
    try{
        let {uid} = req.params;
        let followingIds = await getFollowingIds(uid);
        // console.log(followingIds);
        let followingUsers = [];
        for(let i=0 ; i<followingIds.length ; i++){
            let followId = followingIds[i].follow_id;
            let user = await getUserById(followId);
            followingUsers.push(user[0]);
        }
        // console.log(followingUsers);
        res.json({
            message:"got all following",
            data : followingUsers
        })
    }
    catch(error){
        res.json({
            message:"failed to get following !",
            error:error
        })
    }
})


// get followers
function getFollowersId(uid){
      return new Promise((resolve , reject)=>{
          let sql = `SELECT follower_id FROM user_follower WHERE uid = "${uid}"`;
          connection.query(sql , function(error ,data){
              if(error){
                  reject(error);
              }
              else{
                  resolve(data);
              }
          }) 
      })
}
app.get("/user/follower/:uid" , async function(req , res){
    try{
        let {uid }= req.params;
        let followerIds  = await getFollowersId(uid);
        console.log(followerIds);
        let followerUsers = [];
        for(let i=0 ; i<followerIds.length ; i++){
            let followerId = followerIds[i].follower_id;
            let user = await getUserById(followerId);
            followerUsers.push(user[0]);
        }
        res.json({
            message:"got all followers succesfully",
            data: followerUsers 
        })
    }
    catch(error){
        res.json({
            message:"Failed to get all followers !!",
            error : error
        })
    }
})



app.listen(3000, function () {
  console.log("server is listening at 3000 port !!");
});
