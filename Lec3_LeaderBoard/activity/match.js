let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");

let leaderboard = [];
let count=0;


function getMatchDetails(link){
    count++;
    console.log("sending request" , count);
    request( link , fun  );
} 

function fun(error , response , data){
    if(error==null && response.statusCode == 200){
        console.log("Received data" , count);
        parseData(data);
        count--;
        if(count==0){
            console.table(leaderboard);
        }
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
        // console.log(teamName);

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
                    createLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes );
                }
            }

        }
    }
}

function createLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes ){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    // check if a batsman has a entry in leaderBoard
    // entry exits => ? update batsman and return;
    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Name == batsmanName && leaderboard[i].Team == teamName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }

    // entry do not exists => create a new entry and push it into lb
    let entry = {
        Team: teamName,
        Name : batsmanName,
        Runs : runs ,
        Balls : balls,
        Fours : fours ,
        Sixes : sixes
    };
    leaderboard.push(entry);
}



module.exports = getMatchDetails;