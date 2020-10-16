let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");
const getMatchDetails = require("./match");


function getAllMatches(link){
    request( link  , fun  );
}


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
    console.log("in allMatches file");
    //fs.writeFileSync("./allMatches.html" , html);
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');
    // Array of all <a> </a> Tags
    //[ <a></a> ,<a></a> ,<a></a> ,<a></a> ,<a></a> ,<a></a> ,
    // <a></a> ,<a></a> ,<a></a> ]
    console.log(allATags.length);
    for(let i=0 ; i<allATags.length ; i++){
        let link = cheerio(allATags[i]).attr("href");
        let completeLink = "https://www.espncricinfo.com"+link;
        getMatchDetails(completeLink);
    }
}


module.exports = getAllMatches;
