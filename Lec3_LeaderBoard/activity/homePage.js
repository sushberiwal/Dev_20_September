//npm install request
let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");
const getAllMatches = require("./allMatches");

// hof and cb ?
// async function => node api
request( "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup" , fun );
//fun(null , {statusCode:200,method:get} , htmlFile ); //=> succesfull data
//fun("page Not found" , {statusCode:404,method:get} , null); //=> failed data

function fun(error , response , data){
    if(error==null && response.statusCode == 200){
        parseData(data);
    }
    else if(response.statusCode == 404){
        console.log("Page Not Found !!");
    }
    else{
        console.log(error);
    }
}

function parseData(html){
    console.log("in homePAge file ")
    let ch = cheerio.load(html);
    let link = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com"+link;
    // console.log(completeLink);
    getAllMatches(completeLink);
}

