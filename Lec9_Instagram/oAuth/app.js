// npm install express nodemon ejs passport passport-google-oauth20
const express = require("express");
const passport = require("passport");
// google strategy => it is used to define how to communicate with google
const GoogleStrategy = require("passport-google-oauth20");
const connection = require("./connection");
const cookieSession = require("cookie-session");

// ejs => templating engine => ek template(home.ejs ,  profile.ejs  , homepage.ejs)
// passport => to handle authentication functions

const app = express();

app.use(
    cookieSession({
        maxAge:24*60*60*1000,
        keys:["akjsbdajsbahbjadsb"]
    })
)


// insta => client id , client secret

function getUserById(gid){
    return new Promise((resolve , reject)=>{
        let sql = `SELECT * FROM user_google WHERE gid = '${gid}'`;
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


function createUser(userObject){
    return new Promise((resolve , reject)=>{
        let {gId , name , email , pImage} = userObject;
        let sql = `INSERT INTO user_google(gid , name , email , pImage) VALUES ( '${gId}' , '${name}' , '${email}' , '${pImage}'  ) `;
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

// when cookie is not present and reach this point when all the authencation has happened 
passport.serializeUser( (user , done)=>{
    console.log("inside serialize user !!");
    console.log(user);
    done(null , user.gId); //=> cookie generated as saved as id
});

// cookie already present then deserialize user will give you a id
passport.deserializeUser( (id , done)=>{
    console.log("inside deserialize user !!");
    getUserById(id).then((userData)=>{
        console.log(userData);
        done(null , userData[0]);
    })
})


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "886797572833-87ar3vp4n9s5gtom9eetsqt16jlporug.apps.googleusercontent.com",
      clientSecret: "TdiJGNh70nVUogSs8pRkUXuA",
      callbackURL: "/auth/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("passport callback function called !!!");
      console.log(profile);

      let gId = profile.id;
      let name = profile.displayName;
      let email = profile.emails[0].value;
      let pImage = profile.photos[0].value;
      let userObject = {gId , name , email , pImage };
      // find if user exists in databases ??
      let userData = await getUserById(gId);
      if(userData.length){
          // if yes => user already signed up => profile page
          console.log("user already signed up inside pcb");
          done(null , userObject); // user is appended in req.user; // req.body // req.params 
      }
      else{
          // else => user created first time => profile page
          let userData = await createUser(userObject);
          console.log(userData);
          console.log("new user created and inside pcb");
          // ???
          done(null , userObject); // 
      }


    }
  )
);


app.set("view engine", "ejs");

function authChecker(req, res , next){
    if(req.user){
        next();
    }
    else{
        res.redirect("/");
    }
}


app.get("/" , (req, res) => {
  res.render("login", {user : req.user});
});

app.get("/home", authChecker , (req, res) => {
  res.render("home" , {user : req.user});
});

app.get("/profile", authChecker , (req, res) => {
  res.render("profile" , {user : req.user}  );
});

// path which takes user to google consent screen
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// redirect callback path // middleware => user is emebedded in req.user;
app.get("/auth/callback", passport.authenticate("google") , (req, res) => {
  console.log("inside callback url");
  res.redirect("/profile");
  // profile page pe leke jao
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.listen(4000, () => {
  console.log("app is listening at port 4000 !!");
});
