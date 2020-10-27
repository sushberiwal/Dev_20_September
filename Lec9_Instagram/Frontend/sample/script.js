let search = document.querySelector(".search");
let uid = document.querySelector("#uid");
let name = document.querySelector(".profile-name");
let handle = document.querySelector(".profile-handle");
let bio = document.querySelector(".profile-bio");
let following = document.querySelector(".following .count");
let follower = document.querySelector(".follower .count");



search.addEventListener("click" , async function(){
    let uidValue = uid.value;
    console.log(uidValue);
    let userData = await axios.get(`http:localhost:3000/user/${uidValue}`);
    let user = userData.data.user;
    let followingData = await axios.get(`http:localhost:3000/user/following/${uidValue}`)
    let followerData  = await axios.get(`http:localhost:3000/user/follower/${uidValue}`);
    let followCount = followingData.data.data.length;
    let followerCount = followerData.data.data.length;
    
    name.innerHTML = user.name;
    handle.innerHTML = user.handle;
    bio.innerHTML = user.bio;    
    following.innerHTML = followCount;
    follower.innerHTML = followerCount;
})