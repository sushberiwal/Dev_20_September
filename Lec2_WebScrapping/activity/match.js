let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");

function getMatchDetails(link){
    request( link , fun  );
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
    // fs.writeFileSync("./match.html" , html);
    let ch = cheerio.load(html);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // array => [  <div class="Collapsible"> </div>  , <div class="Collapsible"> </div>   ]
    // console.log(bothInnings.length);
    // fs.writeFileSync("./match.html" , bothInnings);
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = cheerio(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("Innings")[0].trim();
        console.log(teamName);

        if(!teamName.includes("Team")){
            
            let allBatsmanDetails = cheerio(bothInnings[i]).find(".table.batsman tbody tr");
            // console.log(allBatsmanDetails.length);
    
            for(let j=0 ; j<allBatsmanDetails.length-1 ; j++){
                let oneBatsmanDetails = cheerio(allBatsmanDetails[j]).find("td");
                if(oneBatsmanDetails.length > 1){
                    let batsmanName =  cheerio(oneBatsmanDetails[0]).find("a").text().trim();
                    let runs = cheerio(oneBatsmanDetails[2]).text().trim();
                    let balls = cheerio(oneBatsmanDetails[3]).text().trim();
                    let fours = cheerio(oneBatsmanDetails[5]).text().trim();
                    let sixes = cheerio(oneBatsmanDetails[6]).text().trim();
                    let sr = cheerio(oneBatsmanDetails[7]).text().trim();
                    // console.log( `Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${sr}`);
                    processDetails(teamName , batsmanName , runs , balls , fours , sixes , sr);
                }
            }

        }
    }
}


function teamFolderExist(teamName){
    let teamPath = teamName;
    return fs.existsSync(teamPath);
}

function batsmanFileExists(teamName , batsmanName){
    let batsmanPath = teamName+"/"+batsmanName+".json";
    return fs.existsSync(batsmanPath)
}

function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr){
    let batsmanPath = teamName+"/"+batsmanName+".json";
    let entries = fs.readFileSync(batsmanPath);
    let inning = {
        Runs : runs ,
        Balls : balls ,
        Fours : fours , 
        Sixes : sixes,
        StrikeRate : sr
    }
    entries = JSON.parse(entries);
    entries.push(inning);
    entries = JSON.stringify(entries);
    fs.writeFileSync(batsmanPath , entries);
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr){
// JSON => Javascript object notation
 let batsmanPath = teamName+"/"+batsmanName+".json";
 let entries=[];
 let inning = {
     Runs : runs ,
     Balls : balls ,
     Fours : fours , 
     Sixes : sixes,
     StrikeRate : sr
 }
 entries.push(inning);
 entries = JSON.stringify(entries);
 fs.writeFileSync(batsmanPath , entries);
}

function createTeamFolder(teamName){
    let teamPath = teamName;
    fs.mkdirSync(teamPath);
}

function processDetails(teamName , batsmanName , runs , balls , fours , sixes , sr){
    let isTeamFolderExist = teamFolderExist(teamName);
    if(isTeamFolderExist){
        let isBatsmanExist = batsmanFileExists(teamName , batsmanName);
        if(isBatsmanExist){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr);    
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr);
    }
}

module.exports = getMatchDetails;